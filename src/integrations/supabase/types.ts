export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      device_status_history: {
        Row: {
          at: string
          device_id: string | null
          id: number
          note: string | null
          reservation_id: string | null
          status: string
        }
        Insert: {
          at?: string
          device_id?: string | null
          id?: number
          note?: string | null
          reservation_id?: string | null
          status: string
        }
        Update: {
          at?: string
          device_id?: string | null
          id?: number
          note?: string | null
          reservation_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "device_status_history_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "device_status_history_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "device_status_history_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "v_active_reservations"
            referencedColumns: ["id"]
          },
        ]
      }
      devices: {
        Row: {
          created_at: string | null
          id: string
          model: string | null
          purchased_at: string | null
          serial_no: string
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          model?: string | null
          purchased_at?: string | null
          serial_no: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          model?: string | null
          purchased_at?: string | null
          serial_no?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      matview_refresh_history: {
        Row: {
          duration_ms: number | null
          finished_at: string | null
          id: number
          message: string | null
          started_at: string
          status: string
          view_name: string
        }
        Insert: {
          duration_ms?: number | null
          finished_at?: string | null
          id?: number
          message?: string | null
          started_at?: string
          status?: string
          view_name: string
        }
        Update: {
          duration_ms?: number | null
          finished_at?: string | null
          id?: number
          message?: string | null
          started_at?: string
          status?: string
          view_name?: string
        }
        Relationships: []
      }
      org_settings: {
        Row: {
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount_cents: number
          captured_at: string | null
          created_at: string | null
          currency: string
          id: string
          reservation_id: string | null
          status: string
          stripe_payment_intent_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount_cents: number
          captured_at?: string | null
          created_at?: string | null
          currency?: string
          id?: string
          reservation_id?: string | null
          status: string
          stripe_payment_intent_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount_cents?: number
          captured_at?: string | null
          created_at?: string | null
          currency?: string
          id?: string
          reservation_id?: string | null
          status?: string
          stripe_payment_intent_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_reservation_fk"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_reservation_fk"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "v_active_reservations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "v_active_reservations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
        }
        Relationships: []
      }
      refresh_log: {
        Row: {
          id: number
          notes: string | null
          ran_at: string | null
        }
        Insert: {
          id?: number
          notes?: string | null
          ran_at?: string | null
        }
        Update: {
          id?: number
          notes?: string | null
          ran_at?: string | null
        }
        Relationships: []
      }
      reservations: {
        Row: {
          contact_email: string
          contact_name: string
          contact_phone: string | null
          created_at: string
          destination: string
          device_id: string | null
          end_date: string
          id: string
          notes: string | null
          plan_type: Database["public"]["Enums"]["plan_type"]
          start_date: string
          status: Database["public"]["Enums"]["reservation_status"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          contact_email: string
          contact_name: string
          contact_phone?: string | null
          created_at?: string
          destination: string
          device_id?: string | null
          end_date: string
          id?: string
          notes?: string | null
          plan_type: Database["public"]["Enums"]["plan_type"]
          start_date: string
          status?: Database["public"]["Enums"]["reservation_status"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          contact_email?: string
          contact_name?: string
          contact_phone?: string | null
          created_at?: string
          destination?: string
          device_id?: string | null
          end_date?: string
          id?: string
          notes?: string | null
          plan_type?: Database["public"]["Enums"]["plan_type"]
          start_date?: string
          status?: Database["public"]["Enums"]["reservation_status"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reservations_device_fk"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["id"]
          },
        ]
      }
      shipments: {
        Row: {
          carrier: string | null
          created_at: string | null
          direction: string
          id: string
          label_url: string | null
          last_event: string | null
          last_event_at: string | null
          reservation_id: string | null
          shippo_object_id: string | null
          status: string | null
          tracking_number: string | null
          updated_at: string | null
        }
        Insert: {
          carrier?: string | null
          created_at?: string | null
          direction: string
          id?: string
          label_url?: string | null
          last_event?: string | null
          last_event_at?: string | null
          reservation_id?: string | null
          shippo_object_id?: string | null
          status?: string | null
          tracking_number?: string | null
          updated_at?: string | null
        }
        Update: {
          carrier?: string | null
          created_at?: string | null
          direction?: string
          id?: string
          label_url?: string | null
          last_event?: string | null
          last_event_at?: string | null
          reservation_id?: string | null
          shippo_object_id?: string | null
          status?: string | null
          tracking_number?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shipments_reservation_fk"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipments_reservation_fk"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "v_active_reservations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipments_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipments_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "v_active_reservations"
            referencedColumns: ["id"]
          },
        ]
      }
      shippo_events_raw: {
        Row: {
          event: string
          id: number
          payload: Json
          received_at: string | null
        }
        Insert: {
          event: string
          id?: number
          payload: Json
          received_at?: string | null
        }
        Update: {
          event?: string
          id?: number
          payload?: Json
          received_at?: string | null
        }
        Relationships: []
      }
      stripe_events_raw: {
        Row: {
          event_id: string
          id: number
          payload: Json
          received_at: string | null
          type: string
        }
        Insert: {
          event_id: string
          id?: number
          payload: Json
          received_at?: string | null
          type: string
        }
        Update: {
          event_id?: string
          id?: number
          payload?: Json
          received_at?: string | null
          type?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      mv_occupancy_daily: {
        Row: {
          day: string | null
          devices_out: number | null
          devices_total: number | null
          occupancy_ratio: number | null
        }
        Relationships: []
      }
      mv_revenue_daily: {
        Row: {
          day: string | null
          gross_usd: number | null
          refunds_usd: number | null
        }
        Relationships: []
      }
      v_active_reservations: {
        Row: {
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          created_at: string | null
          destination: string | null
          end_date: string | null
          id: string | null
          notes: string | null
          plan_type: Database["public"]["Enums"]["plan_type"] | null
          start_date: string | null
          status: Database["public"]["Enums"]["reservation_status"] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string | null
          destination?: string | null
          end_date?: string | null
          id?: string | null
          notes?: string | null
          plan_type?: Database["public"]["Enums"]["plan_type"] | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["reservation_status"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string | null
          destination?: string | null
          end_date?: string | null
          id?: string | null
          notes?: string | null
          plan_type?: Database["public"]["Enums"]["plan_type"] | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["reservation_status"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      v_kpis_overview: {
        Row: {
          active_reservations: number | null
          avg_rental_days: number | null
          devices_total: number | null
          occupancy_today: number | null
          revenue_30d: number | null
          revenue_7d: number | null
          units_out_today: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      refresh_materialized_views: { Args: never; Returns: undefined }
    }
    Enums: {
      app_role: "admin" | "user"
      plan_type: "standard" | "premium" | "unlimited"
      reservation_status:
        | "pending"
        | "confirmed"
        | "active"
        | "completed"
        | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      plan_type: ["standard", "premium", "unlimited"],
      reservation_status: [
        "pending",
        "confirmed",
        "active",
        "completed",
        "cancelled",
      ],
    },
  },
} as const
