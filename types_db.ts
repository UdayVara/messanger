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
      messages: {
        Row: {
          created_at: string
          id: number
          message: string | null
          reciever_id: string | null
          sender_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          message?: string | null
          reciever_id?: string | null
          sender_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          message?: string | null
          reciever_id?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_reciever_id_fkey"
            columns: ["reciever_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          email: string | null
          id: string
          password: string | null
          status: Database["public"]["Enums"]["user_status"] | null
          username: string | null
        }
        Insert: {
          email?: string | null
          id: string
          password?: string | null
          status?: Database["public"]["Enums"]["user_status"] | null
          username?: string | null
        }
        Update: {
          email?: string | null
          id?: string
          password?: string | null
          status?: Database["public"]["Enums"]["user_status"] | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      authorize: {
        Args: {
          requested_permission: Database["public"]["Enums"]["app_permission"]
          user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_permission: "channels.delete" | "messages.delete"
      app_role: "admin" | "moderator"
      user_status: "ONLINE" | "OFFLINE"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
