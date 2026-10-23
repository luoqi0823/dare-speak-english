interface RpcErrorLike {
  message?: string;
}

interface LearningRpcErrorResponse {
  message: string;
  status: number;
}

const knownErrors: Record<string, LearningRpcErrorResponse> = {
  ANSWER_IS_CORRECT: { message: "这个答案是正确的，不会加入错题本", status: 409 },
  COURSE_COMPLETE: { message: "第一阶段已经完成", status: 409 },
  LESSON_ITEM_NOT_FOUND: { message: "课程内容不存在", status: 404 },
  MISTAKE_NOT_FOUND: { message: "错题不存在或不属于当前账号", status: 404 },
  NOT_CURRENT_LESSON: { message: "请先完成当前课程", status: 409 },
  QUIZ_ITEM_NOT_FOUND: { message: "题目不存在", status: 404 },
  UNAUTHENTICATED: { message: "请先登录", status: 401 },
};

export function resolveLearningRpcError(
  error: RpcErrorLike | null,
  fallback: string,
): LearningRpcErrorResponse {
  if (!error?.message) return { message: fallback, status: 500 };

  const code = Object.keys(knownErrors).find((item) => error.message?.includes(item));
  return code ? knownErrors[code] : { message: fallback, status: 500 };
}
