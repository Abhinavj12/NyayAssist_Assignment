import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { todoSchema } from "@/lib/validations"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    // Transform the data before validation
    const transformedData = {
      ...body,
      dueDate: body.dueDate ? body.dueDate : null,
    }

    const validatedData = todoSchema.partial().parse(transformedData)

    const todo = await prisma.todo.updateMany({
      where: {
        id: params.id,
        userId: session.user.id,
      },
      data: validatedData,
    })

    if (todo.count === 0) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 })
    }

    const updatedTodo = await prisma.todo.findUnique({
      where: { id: params.id },
    })

    return NextResponse.json(updatedTodo)
  } catch (error) {
    console.error("Error updating todo:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const todo = await prisma.todo.deleteMany({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (todo.count === 0) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Todo deleted successfully" })
  } catch (error) {
    console.error("Error deleting todo:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
