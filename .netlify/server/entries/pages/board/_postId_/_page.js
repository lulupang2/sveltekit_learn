const load = async ({ params }) => {
  const { postId } = params;
  return { postId };
};
export {
  load
};
