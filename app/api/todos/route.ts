import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { todoSchema } from "@/lib/validations"
import { z } from "zod"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const priority = searchParams.get("priority")
    const search = searchParams.get("search")

    const where: any = { userId: session.user.id }

    if (status && status !== "all") {
      where.status = status.toUpperCase()
    }

    if (priority && priority !== "all") {
      where.priority = priority.toUpperCase()
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    const todos = await prisma.todo.findMany({
      where,
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(todos)
  } catch (error) {
    console.error("Error fetching todos:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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

    const validatedData = todoSchema.parse(transformedData)

    const todo = await prisma.todo.create({
      data: {
        ...validatedData,
        userId: session.user.id,
      },
    })

    return NextResponse.json(todo, { status: 201 })
  } catch (error) {
    console.error("Error creating todo:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation error", details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
