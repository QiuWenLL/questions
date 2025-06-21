export interface Question {
  id: string;
  content: string;
  answer: string;
  explanation?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  paper?: string; // 新增试卷分类字段
  createdAt?: Date;
  updatedAt?: Date;
}