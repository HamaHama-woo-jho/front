const filterPosts = (posts, filter) => {
  return (posts
    .filter((post) => post.title.includes(filter.keyword) || post.textArea.includes(filter.keyword))
    .filter((post) => filter.location.includes(post.location))
    .filter((post) => {
      const price = post.isDivide ? post.price / post.personnel : post.price;
      return filter.priceLow <= price && price <= filter.priceHigh;
    })
    .filter((post) => {
      const filterHigh = filter.to;
      if (filterHigh) {
        return new Date(post.to).getTime() >= filterHigh.getTime();
      }
      return true;
    })
    .filter((post) => {
      const curTag = new Set(post.Hashtags.map((tag) => tag.id));
      const filterTag = new Set(filter.hashtags.map((tag) => tag.id));
      const isEmpty = [...new Set([...filterTag].filter((x) => !curTag.has(x)))].length; // 차집합
      return isEmpty === 0;
    })
  );
};

export default filterPosts;
