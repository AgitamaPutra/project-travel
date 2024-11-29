
import prisma from "@/app/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Ambil semua transaksi dari database
        const users = await prisma.user.findMany({});

        return { props: { users } }
    } catch (err: any) {
        // Kembalikan respons error
        return NextResponse.json(
            {
                success: false,
                message: err?.message || "Internal Server Error",
            },
            {
                status: 500,
            }
        );
    }
}