export interface Question {
  id: number
  content: string
  answer: string
  analysis?: string
  category?: string
  difficulty?: number
}