export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      tenants: {
        Row: {
          id: string
          code: string
          name: string
          domain: string | null
          settings: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          code: string
          name: string
          domain?: string | null
          settings?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          code?: string
          name?: string
          domain?: string | null
          settings?: Json
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          name: string
          avatar_url: string | null
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          avatar_url?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          avatar_url?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_tenants: {
        Row: {
          id: string
          user_id: string
          tenant_id: string
          role: string
          department_id: string | null
          permissions: string[]
          is_primary: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tenant_id: string
          role?: string
          department_id?: string | null
          permissions?: string[]
          is_primary?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tenant_id?: string
          role?: string
          department_id?: string | null
          permissions?: string[]
          is_primary?: boolean
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          tenant_id: string
          sku: string
          name: string
          description: string | null
          price: number
          compare_at_price: number | null
          images: string[]
          category_id: string | null
          inventory: number
          min_order_qty: number
          status: string
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          sku: string
          name: string
          description?: string | null
          price: number
          compare_at_price?: number | null
          images?: string[]
          category_id?: string | null
          inventory?: number
          min_order_qty?: number
          status?: string
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          sku?: string
          name?: string
          description?: string | null
          price?: number
          compare_at_price?: number | null
          images?: string[]
          category_id?: string | null
          inventory?: number
          min_order_qty?: number
          status?: string
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          tenant_id: string
          user_id: string | null
          order_number: string
          status: string
          subtotal: number
          shipping: number
          tax: number
          total: number
          shipping_address: Json | null
          billing_address: Json | null
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          user_id?: string | null
          order_number: string
          status?: string
          subtotal: number
          shipping?: number
          tax?: number
          total: number
          shipping_address?: Json | null
          billing_address?: Json | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          user_id?: string | null
          order_number?: string
          status?: string
          subtotal?: number
          shipping?: number
          tax?: number
          total?: number
          shipping_address?: Json | null
          billing_address?: Json | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          company: string
          contact_name: string
          email: string | null
          phone: string | null
          status: string | null
          source: string | null
          value: number | null
          assigned_to_id: string | null
          notes: string | null
          city: string | null
          services: string | null
          stage_id: string | null
          service_id: string | null
          priority: string | null
          expected_close_date: string | null
          last_contact_at: string | null
          next_follow_up: string | null
          won_at: string | null
          lost_at: string | null
          lost_reason: string | null
          won_amount: number | null
          tags: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company: string
          contact_name: string
          email?: string | null
          phone?: string | null
          status?: string
          source?: string | null
          value?: number | null
          assigned_to_id?: string | null
          notes?: string | null
          city?: string | null
          services?: string | null
          stage_id?: string | null
          service_id?: string | null
          priority?: string | null
          expected_close_date?: string | null
          last_contact_at?: string | null
          next_follow_up?: string | null
          won_at?: string | null
          lost_at?: string | null
          lost_reason?: string | null
          won_amount?: number | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company?: string
          contact_name?: string
          email?: string | null
          phone?: string | null
          status?: string
          source?: string | null
          value?: number | null
          assigned_to_id?: string | null
          notes?: string | null
          city?: string | null
          services?: string | null
          stage_id?: string | null
          service_id?: string | null
          priority?: string | null
          expected_close_date?: string | null
          last_contact_at?: string | null
          next_follow_up?: string | null
          won_at?: string | null
          lost_at?: string | null
          lost_reason?: string | null
          won_amount?: number | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      lead_stages: {
        Row: {
          id: string
          name: string
          code: string
          color: string
          order: number
          is_active: boolean | null
          is_won: boolean | null
          is_lost: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          code: string
          color?: string
          order: number
          is_active?: boolean | null
          is_won?: boolean | null
          is_lost?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          code?: string
          color?: string
          order?: number
          is_active?: boolean | null
          is_won?: boolean | null
          is_lost?: boolean | null
          created_at?: string | null
        }
      }
      services: {
        Row: {
          id: string
          name: string
          code: string
          description: string | null
          base_price: number | null
          currency: string | null
          is_active: boolean | null
          order: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          code: string
          description?: string | null
          base_price?: number | null
          currency?: string | null
          is_active?: boolean | null
          order?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          code?: string
          description?: string | null
          base_price?: number | null
          currency?: string | null
          is_active?: boolean | null
          order?: number | null
          created_at?: string | null
        }
      }
      lead_activities: {
        Row: {
          id: string
          lead_id: string
          user_id: string | null
          activity_type: string
          title: string
          description: string | null
          outcome: string | null
          duration_minutes: number | null
          scheduled_at: string | null
          completed_at: string | null
          metadata: Json | null
          created_at: string | null
        }
        Insert: {
          id?: string
          lead_id: string
          user_id?: string | null
          activity_type: string
          title: string
          description?: string | null
          outcome?: string | null
          duration_minutes?: number | null
          scheduled_at?: string | null
          completed_at?: string | null
          metadata?: Json | null
          created_at?: string | null
        }
        Update: {
          id?: string
          lead_id?: string
          user_id?: string | null
          activity_type?: string
          title?: string
          description?: string | null
          outcome?: string | null
          duration_minutes?: number | null
          scheduled_at?: string | null
          completed_at?: string | null
          metadata?: Json | null
          created_at?: string | null
        }
      }
      payment_links: {
        Row: {
          id: string
          lead_id: string
          created_by: string | null
          amount: number
          currency: string | null
          description: string | null
          payment_url: string | null
          status: string | null
          due_date: string | null
          paid_at: string | null
          paid_amount: number | null
          transaction_id: string | null
          proof_url: string | null
          notes: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          lead_id: string
          created_by?: string | null
          amount: number
          currency?: string | null
          description?: string | null
          payment_url?: string | null
          status?: string | null
          due_date?: string | null
          paid_at?: string | null
          paid_amount?: number | null
          transaction_id?: string | null
          proof_url?: string | null
          notes?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          lead_id?: string
          created_by?: string | null
          amount?: number
          currency?: string | null
          description?: string | null
          payment_url?: string | null
          status?: string | null
          due_date?: string | null
          paid_at?: string | null
          paid_amount?: number | null
          transaction_id?: string | null
          proof_url?: string | null
          notes?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      lead_documents: {
        Row: {
          id: string
          lead_id: string
          uploaded_by: string | null
          document_type: string | null
          file_name: string
          file_url: string
          file_size: number | null
          mime_type: string | null
          notes: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          lead_id: string
          uploaded_by?: string | null
          document_type?: string | null
          file_name: string
          file_url: string
          file_size?: number | null
          mime_type?: string | null
          notes?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          lead_id?: string
          uploaded_by?: string | null
          document_type?: string | null
          file_name?: string
          file_url?: string
          file_size?: number | null
          mime_type?: string | null
          notes?: string | null
          created_at?: string | null
        }
      }
      credentials: {
        Row: {
          id: string
          name: string
          username: string
          password: string
          email: string | null
          url: string | null
          notes: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          username: string
          password: string
          email?: string | null
          url?: string | null
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          username?: string
          password?: string
          email?: string | null
          url?: string | null
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      banks: {
        Row: {
          id: string
          name: string
          account_name: string
          account_number: string
          routing_number: string | null
          swift_code: string | null
          bank_name: string
          branch_address: string | null
          currency: string
          is_active: boolean
          notes: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          account_name: string
          account_number: string
          routing_number?: string | null
          swift_code?: string | null
          bank_name: string
          branch_address?: string | null
          currency?: string
          is_active?: boolean
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          account_name?: string
          account_number?: string
          routing_number?: string | null
          swift_code?: string | null
          bank_name?: string
          branch_address?: string | null
          currency?: string
          is_active?: boolean
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      cards: {
        Row: {
          id: string
          card_name: string
          card_type: string
          last_four: string
          expiry_month: number
          expiry_year: number
          cardholder_name: string
          billing_address: Json | null
          is_active: boolean
          notes: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          card_name: string
          card_type: string
          last_four: string
          expiry_month: number
          expiry_year: number
          cardholder_name: string
          billing_address?: Json | null
          is_active?: boolean
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          card_name?: string
          card_type?: string
          last_four?: string
          expiry_month?: number
          expiry_year?: number
          cardholder_name?: string
          billing_address?: Json | null
          is_active?: boolean
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      api_keys: {
        Row: {
          id: string
          name: string
          key_value: string
          notes: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          key_value: string
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          key_value?: string
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      teams: {
        Row: {
          id: string
          code: string
          name: string
          description: string | null
          type: string
          icon: string | null
          color: string | null
          order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          code: string
          name: string
          description?: string | null
          type: string
          icon?: string | null
          color?: string | null
          order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          code?: string
          name?: string
          description?: string | null
          type?: string
          icon?: string | null
          color?: string | null
          order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      user_teams: {
        Row: {
          id: string
          user_id: string
          tenant_id: string | null
          team_id: string
          role: string
          is_primary: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tenant_id?: string | null
          team_id: string
          role: string
          is_primary?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tenant_id?: string | null
          team_id?: string
          role?: string
          is_primary?: boolean
          created_at?: string
        }
      }
      team_navigation: {
        Row: {
          id: string
          team_id: string
          label: string
          icon: string | null
          url: string
          order: number
          parent_id: string | null
          is_global: boolean
          created_at: string
        }
        Insert: {
          id?: string
          team_id: string
          label: string
          icon?: string | null
          url: string
          order?: number
          parent_id?: string | null
          is_global?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          team_id?: string
          label?: string
          icon?: string | null
          url?: string
          order?: number
          parent_id?: string | null
          is_global?: boolean
          created_at?: string
        }
      }
      chat_channels: {
        Row: {
          id: string
          name: string
          description: string | null
          type: string
          team_id: string | null
          avatar_url: string | null
          is_archived: boolean | null
          created_by: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          type: string
          team_id?: string | null
          avatar_url?: string | null
          is_archived?: boolean | null
          created_by?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          type?: string
          team_id?: string | null
          avatar_url?: string | null
          is_archived?: boolean | null
          created_by?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      chat_channel_members: {
        Row: {
          id: string
          channel_id: string
          user_id: string
          role: string
          is_pinned: boolean | null
          is_muted: boolean | null
          joined_at: string | null
        }
        Insert: {
          id?: string
          channel_id: string
          user_id: string
          role?: string
          is_pinned?: boolean | null
          is_muted?: boolean | null
          joined_at?: string | null
        }
        Update: {
          id?: string
          channel_id?: string
          user_id?: string
          role?: string
          is_pinned?: boolean | null
          is_muted?: boolean | null
          joined_at?: string | null
        }
      }
      chat_messages: {
        Row: {
          id: string
          channel_id: string
          sender_id: string
          content: string
          message_type: string
          metadata: Json | null
          reply_to_id: string | null
          is_edited: boolean | null
          is_deleted: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          channel_id: string
          sender_id: string
          content: string
          message_type?: string
          metadata?: Json | null
          reply_to_id?: string | null
          is_edited?: boolean | null
          is_deleted?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          channel_id?: string
          sender_id?: string
          content?: string
          message_type?: string
          metadata?: Json | null
          reply_to_id?: string | null
          is_edited?: boolean | null
          is_deleted?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      chat_read_receipts: {
        Row: {
          id: string
          channel_id: string
          user_id: string
          last_read_message_id: string | null
          last_read_at: string | null
        }
        Insert: {
          id?: string
          channel_id: string
          user_id: string
          last_read_message_id?: string | null
          last_read_at?: string | null
        }
        Update: {
          id?: string
          channel_id?: string
          user_id?: string
          last_read_message_id?: string | null
          last_read_at?: string | null
        }
      }
      chat_user_presence: {
        Row: {
          user_id: string
          status: string
          last_seen_at: string | null
          updated_at: string | null
        }
        Insert: {
          user_id: string
          status?: string
          last_seen_at?: string | null
          updated_at?: string | null
        }
        Update: {
          user_id?: string
          status?: string
          last_seen_at?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      user_profiles: {
        Row: {
          id: string | null
          email: string | null
          full_name: string | null
          avatar_url: string | null
          created_at: string | null
          last_sign_in_at: string | null
        }
      }
    }
    Functions: {
      get_user_profile: {
        Args: { p_user_id: string }
        Returns: {
          id: string
          email: string
          full_name: string
          avatar_url: string
        }[]
      }
      get_user_profiles: {
        Args: { p_user_ids: string[] }
        Returns: {
          id: string
          email: string
          full_name: string
          avatar_url: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
