const getAuthorName = (authors, authorId) => {
  const arrAuthor = authors.filter((author) => author.id === authorId);
  return arrAuthor[0].authorName;
};

export default getAuthorName;
