"use client";

import Image from "next/image";
import { Phone, X } from "lucide-react";
import type { ModalProps, SalesContact } from "@/types";

const salesContacts: SalesContact[] = [
  { name: "Simran Suprans", phone: "9350830133" },
  { name: "Sahil", phone: "9350818272" },
  { name: "Payal", phone: "7988702534" },
  { name: "Parth Suprans", phone: "9350502364" },
  { name: "Isha", phone: "9253110463" },
  { name: "Karishma", phone: "9306524544" },
  { name: "Simran Jr Sales", phone: "7988514291" },
  { name: "Disha", phone: "9817376457" },
];

export default function SalesModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-3">
      <div className="relative w-full max-w-3xl p-4 md:p-6">
        <div className="relative bg-white rounded-xl shadow-xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition"
          >
            <X className="w-5 h-5 text-black" />
          </button>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              Connect with <span className="text-red-600">Suprans Team</span>
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {salesContacts.map((c, idx) => (
                <a
                  key={idx}
                  href={`tel:${c.phone}`}
                  onClick={onClose}
                  className="flex items-center gap-2 bg-gray-50 hover:bg-red-50 border border-gray-200 rounded-lg px-3 py-2 shadow-sm transition"
                >
                  <Phone size={16} className="text-red-600" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{c.name}</p>
                    <p className="text-xs text-gray-600">{c.phone}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:block relative w-36 h-36">
            <Image
              src="/assets/images/B1.png"
              alt="Expert"
              fill
              className="rounded-full object-cover border-4 border-red-600 shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
