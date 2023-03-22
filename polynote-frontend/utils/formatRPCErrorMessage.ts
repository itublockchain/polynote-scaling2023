export const formatRpcErrorMessage = (err?: any): string => {
  if (err == undefined) return "Unknown error";

  try {
    const message = err.error.data.message;
    if (message != null && typeof message === "string") {
      const split = message.split("execution reverted:");
      if (split == undefined || split.length < 2) {
        return message;
      } else {
        return split[1];
      }
    }
    return "Unknown error";
  } catch {
    return "Unknown error";
  }
};
