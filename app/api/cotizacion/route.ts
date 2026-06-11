import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { destino, pasajeros, whatsapp } = body

    if (!destino || !pasajeros || !whatsapp) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400 }
      )
    }

    // Lógica interna: Registra la cotización en consola (reemplazar con persistencia en DB)
    console.log(`[COTIZACIÓN REGISTRADA INTERNAMENTE]:`, { destino, pasajeros, whatsapp })

    return NextResponse.json(
      { success: true, message: 'Cotización procesada de forma interna correctamente.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error en API interna de cotización:', error)
    return NextResponse.json(
      { error: 'Error interno en el servidor.' },
      { status: 500 }
    )
  }
}
