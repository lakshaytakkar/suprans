"use client"

import { useState } from "react"
import { toast } from "@/components/ui/sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createInquiryLead } from "@/lib/actions/inquiry"
import { Loader2 } from "lucide-react"
import { FaUser, FaPhone, FaEnvelope, FaCity } from "react-icons/fa"

const servicesList = [
  "Brand Development",
  "Dropshipping",
  "USA LLC Formation",
  "Canton Fair",
  "Video Call",
]

interface InquiryFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InquiryFormModal({ open, onOpenChange }: InquiryFormModalProps) {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    city: "",
    services: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const createMutation = useMutation({
    mutationFn: createInquiryLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] })
      toast.success("Inquiry submitted successfully", {
        description: "We will contact you soon!",
        duration: 3000,
      })
      onOpenChange(false)
      setFormData({
        name: "",
        mobile: "",
        email: "",
        city: "",
        services: "",
      })
    },
    onError: (error: Error) => {
      toast.error("Failed to submit inquiry", {
        description: error.message,
        duration: 5000,
      })
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.mobile || !formData.email || !formData.city || !formData.services) {
      toast.error("Please fill in all required fields")
      return
    }

    createMutation.mutate({
      name: formData.name.trim(),
      mobile: formData.mobile.trim(),
      email: formData.email.trim(),
      city: formData.city.trim(),
      services: formData.services,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0 border-b">
          <DialogTitle className="text-xl font-semibold">Inquiry Form</DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Fill the form and we will contact you soon
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Name <span className="text-red-600">*</span>
              </Label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-600" />
                <Input
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10 h-[52px] rounded-xl border-[#dfe1e7]"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Mobile <span className="text-red-600">*</span>
              </Label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-600" />
                <Input
                  name="mobile"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="pl-10 h-[52px] rounded-xl border-[#dfe1e7]"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Email <span className="text-red-600">*</span>
              </Label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-600" />
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 h-[52px] rounded-xl border-[#dfe1e7]"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                City <span className="text-red-600">*</span>
              </Label>
              <div className="relative">
                <FaCity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-600" />
                <Input
                  name="city"
                  type="text"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={handleChange}
                  className="pl-10 h-[52px] rounded-xl border-[#dfe1e7]"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Services <span className="text-red-600">*</span>
              </Label>
              <div className="flex flex-wrap gap-4 pt-2">
                {servicesList.map((service) => (
                  <label
                    key={service}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="services"
                      value={service}
                      checked={formData.services === service}
                      onChange={handleChange}
                      className="text-red-600 focus:ring-red-500"
                      required
                    />
                    <span className="text-sm">{service}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-3.5 pt-4 px-6 pb-6 flex-shrink-0 border-t">
            <Button
              type="button"
              onClick={() => onOpenChange(false)}
              variant="outline"
              size="default"
              className="w-[128px]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="default"
              className="w-[128px] bg-red-600 hover:bg-red-700"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

