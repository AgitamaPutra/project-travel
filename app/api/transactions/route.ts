import prisma from "@/app/libs/prisma";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    try {
        // // Ambil semua transaksi dari database
        const transactions = await prisma.transaction.findMany({})

        // // Jika tidak ada transaksi, kembalikan array kosong
        // if (!transactions) {
        //     return NextResponse.json(
        //         {
        //             success: true,
        //             data: [],
        //             message: "No transactions found.",
        //         },
        //         {
        //             status: 200,
        //         }
        //     );
        // }

        // // Kembalikan respons dengan data transaksi
        // return NextResponse.json(
        //     {
        //         success: true,
        //         data: transactions,
        //     },
        //     {
        //         status: 200,
        //     }
        // );

        return NextResponse.json({
            data: []
        })
    } catch (err: any) {
        console.log(err)

        return NextResponse.json({
            data: null
        }, {
            status: 500
        })
    }
}