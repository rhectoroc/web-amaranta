"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  destino: z.string().min(1, "Por favor selecciona un destino de viaje."),
  pasajeros: z
    .string()
    .min(1, "El número de pasajeros es requerido.")
    .refine((val) => {
      const num = parseInt(val, 10);
      return !isNaN(num) && num > 0 && num <= 50;
    }, "Debe ser entre 1 y 50 pasajeros."),
  whatsapp: z
    .string()
    .min(1, "El número de WhatsApp es requerido.")
    .regex(
      /^(0412|0414|0424|0416|0426|412|414|424|416|426)\d{7}$/,
      "Ingresa un número venezolano válido (ej: 04141234567)."
    ),
})

type FormValues = z.infer<typeof formSchema>

export default function ExpressQuoteForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [apiError, setApiError] = React.useState<string | null>(null)

  const form = useForm<z.input<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destino: "",
      pasajeros: "2",
      whatsapp: "",
    },
  })

  async function onSubmit(data: z.input<typeof formSchema>) {
    setIsSubmitting(true)
    setApiError(null)

    try {
      // 1. Envío de datos a la API interna de Next.js
      const response = await fetch("/api/cotizacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          pasajeros: parseInt(data.pasajeros, 10),
        }),
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.error || "Algo salió mal al procesar la cotización.")
      }

      // 2. Redirección a WhatsApp con formato legible
      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "584140000000"
      
      // Limpiar formato del número de WhatsApp del usuario para el mensaje si es necesario
      const formattedUserPhone = data.whatsapp.startsWith("0") 
        ? `58${data.whatsapp.substring(1)}` 
        : `58${data.whatsapp}`

      const text = `¡Hola AMARANTA! 🌴 Acabo de cotizar en la web:
📍 Destino: ${data.destino}
👥 Pasajeros: ${data.pasajeros}
📱 Mi contacto: +${formattedUserPhone}
¿Me podrían enviar las tarifas actualizadas y disponibilidad, por favor?`

      const encodedText = encodeURIComponent(text)
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedText}`
      
      window.open(whatsappUrl, "_blank")
    } catch (err: any) {
      setApiError(err.message || "Error al conectar con el servidor.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="backdrop-blur-md rounded-2xl border border-white/40 p-6 md:p-8 shadow-xl max-w-5xl w-full mx-auto"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
    >
      <div className="text-center md:text-left mb-6">
        <h3
          className="text-xl font-bold text-white mb-1"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
        >
          Cotizador Exprés
        </h3>
        <p
          className="text-xs text-white/80"
          style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
        >
          Cotiza al instante. Recibe precios directo en tu WhatsApp.
        </p>
      </div>

      {apiError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs font-semibold">
          {apiError}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
          {/* Destino */}
          <div className="md:col-span-4">
            <FormField
              control={form.control}
              name="destino"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-semibold text-white drop-shadow-md">¿A dónde viajas?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white/30 border-white/40 text-white placeholder:text-white/60 backdrop-blur-sm">
                        <SelectValue placeholder="Selecciona el destino" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Isla de Margarita">Isla de Margarita</SelectItem>
                      <SelectItem value="Isla de Coche">Isla de Coche</SelectItem>
                      <SelectItem value="Isla de Cubagua">Isla de Cubagua</SelectItem>
                      <SelectItem value="Los Roques">Los Roques</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Pasajeros */}
          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="pasajeros"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-semibold text-white drop-shadow-md">Número de Pasajeros</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      max="50"
                      placeholder="2"
                      className="bg-white/30 border-white/40 text-white placeholder:text-white/60 backdrop-blur-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* WhatsApp */}
          <div className="md:col-span-3">
            <FormField
              control={form.control}
              name="whatsapp"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-semibold text-white drop-shadow-md">Tu WhatsApp</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Ej: 04141234567"
                      className="bg-white/30 border-white/40 text-white placeholder:text-white/60 backdrop-blur-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Botón */}
          <div className="md:col-span-3">
            <div className="space-y-1 flex flex-col justify-end h-full">
              <span className="text-xs font-bold block opacity-0 select-none hidden md:block">Spacer</span>
              <Button
                type="submit"
                variant="secondary"
                className="w-full h-11 font-bold text-base flex justify-center items-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Procesando...
                  </>
                ) : (
                  <>
                    Cotizar Ahora <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
