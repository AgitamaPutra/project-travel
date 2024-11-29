import { integrateDoku } from "@/app/libs/doku"
import { NextResponse } from "next/server"

export async function POST (request: Request) {
    try {

    const body = await request.json()
    const response = await integrateDoku(JSON.stringify(body), "/checkout/v1/payment", "post", body.order.invoice_number)

    if(response === null) {
        throw Error("Error!")
    }
    return NextResponse.json({  
        success : false,
        data : response
    }, {
        status: 200
    })
    } catch (err : any) {
        console.log(err)
        return NextResponse.json({
            success : false,
            message: err?.message || "Internal Server Error"
        }, {
            status: 500
        })
    }
} 