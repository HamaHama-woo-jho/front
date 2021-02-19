const filterPosts = (posts, filter) => {
  return (posts
    .filter((post) => post.title.includes(filter.keyword) || post.textArea.includes(filter.keyword))
    .filter((post) => filter.location.includes(post.location))
    .filter((post) => {
      const price = post.isDivide ? post.price / post.personnel : post.price;
      return filter.priceLow < price && price < filter.priceHigh;
    })
    .filter((post) => {
      const filterLow = filter.from;
      const filterHigh = filter.to;
      if (filterLow && filterHigh) {
        return filterLow.getTime() < new Date(post.from).getTime() && new Date(post.to).getTime() < filterHigh.getTime();
      }
      return true;
    })
  );
};

export default filterPosts;
