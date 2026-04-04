import { Ionicons } from '@expo/vector-icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import {
  Button,
  Checkbox,
  Chip,
  Input,
  Spinner,
  Surface,
  TextField,
  useThemeColor,
} from 'heroui-native'
import { useState } from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'

import { Container } from '@/components/container'
import { orpc } from '@/utils/orpc'

function useTodoGetAll({ enabled }: { enabled: boolean }) {
  return useQuery({
    ...orpc.todo.getAll.queryOptions(),
    enabled,
  })
}

function useInvalidateTodos() {
  const queryClient = useQueryClient()

  return function invalidateTodos() {
    return queryClient.invalidateQueries({
      queryKey: orpc.todo.getAll.queryOptions().queryKey,
    })
  }
}

function useTodoCreate({ onSuccess }: { onSuccess?: () => void }) {
  const invalidateTodos = useInvalidateTodos()

  return useMutation(
    orpc.todo.create.mutationOptions({
      onSuccess: () => {
        void invalidateTodos()
        onSuccess?.()
      },
    }),
  )
}

function useTodoUpdate() {
  const invalidateTodos = useInvalidateTodos()

  return useMutation(
    orpc.todo.toggle.mutationOptions({
      onSuccess: () => {
        void invalidateTodos()
      },
    }),
  )
}

function useTodoDelete() {
  const invalidateTodos = useInvalidateTodos()

  return useMutation(
    orpc.todo.delete.mutationOptions({
      onSuccess: () => {
        void invalidateTodos()
      },
    }),
  )
}

export default function TodosScreen() {
  const [newTodoText, setNewTodoText] = useState('')
  const router = useRouter()
  const meQuery = useQuery(orpc.me.queryOptions())
  const todos = useTodoGetAll({
    enabled: Boolean(meQuery.data),
  })
  const createMutation = useTodoCreate({
    onSuccess: () => {
      setNewTodoText('')
    },
  })
  const toggleMutation = useTodoUpdate()
  const deleteMutation = useTodoDelete()

  const mutedColor = useThemeColor('muted')
  const dangerColor = useThemeColor('danger')
  const foregroundColor = useThemeColor('foreground')

  if (meQuery.isLoading) {
    return (
      <Container>
        <View className="flex-1 items-center justify-center p-4">
          <Spinner size="lg" />
          <Text className="mt-3 font-semibold text-slate-700 text-sm">
            CHECKING SESSION...
          </Text>
        </View>
      </Container>
    )
  }

  if (!meQuery.data) {
    return (
      <Container>
        <View className="flex-1 justify-center p-4">
          <View className="items-center rounded-2xl border-2 border-black bg-yellow-300 p-5 shadow-[4px_4px_0_rgba(0,0,0,1)]">
            <Ionicons name="lock-closed-outline" size={36} color="#000000" />
            <Text className="mt-4 text-center font-black text-slate-950 text-xl">
              SIGN IN TO VIEW YOUR TODOS
            </Text>
            <Text className="mt-2 text-center font-semibold text-slate-800 text-sm">
              Your todo list is tied to your account. Log in from the Home
              screen to create and manage tasks.
            </Text>
            <Button
              className="mt-5 rounded-xl border-2 border-black bg-blue-500 shadow-[3px_3px_0_rgba(0,0,0,1)]"
              onPress={() => router.push('/')}
            >
              <Text className="font-black text-white">GO TO HOME</Text>
            </Button>
          </View>
        </View>
      </Container>
    )
  }

  function handleAddTodo() {
    if (newTodoText.trim()) {
      createMutation.mutate({ text: newTodoText })
    }
  }

  function handleToggleTodo(id: number, completed: boolean) {
    toggleMutation.mutate({ id, completed: !completed })
  }

  function handleDeleteTodo(id: number) {
    Alert.alert('Delete Todo', 'Are you sure you want to delete this todo?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteMutation.mutate({ id }),
      },
    ])
  }

  const isLoading = todos?.isLoading
  const completedCount = todos?.data?.filter((t) => t.completed).length || 0
  const totalCount = todos?.data?.length || 0

  return (
    <Container>
      <ScrollView className="flex-1" contentContainerClassName="p-4">
        <View className="mb-4 py-4">
          <View className="flex-row items-center justify-between">
            <Text className="font-black text-3xl text-slate-950 tracking-tight">
              TASKS
            </Text>
            {totalCount > 0 && (
              <View className="rounded-xl border border-black bg-red-500 px-3 py-1 shadow-[2px_2px_0_rgba(0,0,0,1)]">
                <Text className="font-black text-sm text-white">
                  {completedCount}/{totalCount}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View className="mb-4 rounded-2xl border-2 border-black bg-lime-300 p-3 shadow-[4px_4px_0_rgba(0,0,0,1)]">
          <View className="flex-row items-center gap-2">
            <View className="flex-1">
              <TextField>
                <Input
                  value={newTodoText}
                  onChangeText={setNewTodoText}
                  placeholder="Add a new task..."
                  editable={!createMutation.isPending}
                  onSubmitEditing={handleAddTodo}
                  returnKeyType="done"
                />
              </TextField>
            </View>
            <Button
              isIconOnly
              className={`rounded-xl border-2 border-black shadow-[3px_3px_0_rgba(0,0,0,1)] ${
                createMutation.isPending || !newTodoText.trim()
                  ? 'bg-gray-400'
                  : 'bg-green-500'
              }`}
              isDisabled={createMutation.isPending || !newTodoText.trim()}
              onPress={handleAddTodo}
              size="sm"
            >
              {createMutation.isPending ? (
                <Spinner size="sm" color="default" />
              ) : (
                <Ionicons name="add" size={20} color="#ffffff" />
              )}
            </Button>
          </View>
        </View>

        {isLoading && (
          <View className="items-center justify-center py-12">
            <Spinner size="lg" />
            <Text className="mt-3 font-semibold text-slate-700 text-sm">
              LOADING TASKS...
            </Text>
          </View>
        )}

        {todos?.data && todos.data.length === 0 && !isLoading && (
          <View className="items-center justify-center rounded-2xl border-2 border-black bg-purple-300 p-10 shadow-[4px_4px_0_rgba(0,0,0,1)]">
            <Ionicons name="checkbox-outline" size={40} color="#000000" />
            <Text className="mt-3 font-black text-slate-950">NO TASKS YET</Text>
            <Text className="mt-1 font-semibold text-slate-800 text-xs">
              Add your first task to get started
            </Text>
          </View>
        )}

        {todos?.data && todos.data.length > 0 && (
          <View className="gap-2">
            {todos.data.map((todo) => (
              <View
                key={todo.id}
                className={`rounded-2xl border-2 border-black p-3 shadow-[3px_3px_0_rgba(0,0,0,1)] ${
                  todo.completed ? 'bg-gray-300' : 'bg-white'
                }`}
              >
                <View className="flex-row items-center gap-3">
                  <Checkbox
                    isSelected={todo.completed}
                    onSelectedChange={() =>
                      handleToggleTodo(todo.id, todo.completed)
                    }
                  />
                  <View className="flex-1">
                    <Text
                      className={`font-semibold text-sm ${
                        todo.completed
                          ? 'text-slate-500 line-through'
                          : 'text-slate-950'
                      }`}
                    >
                      {todo.text}
                    </Text>
                  </View>
                  <Button
                    isIconOnly
                    className="rounded-xl border border-black bg-red-500 shadow-[2px_2px_0_rgba(0,0,0,1)]"
                    onPress={() => handleDeleteTodo(todo.id)}
                    size="sm"
                  >
                    <Ionicons name="trash-outline" size={16} color="#ffffff" />
                  </Button>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </Container>
  )
}
