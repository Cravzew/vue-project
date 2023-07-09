import axios from "axios";

export const postModule = {
  state: () => ({
    posts: [],
    isLoading: false,
    selectedSort: "",
    page: 1,
    limit: 10,
    totalPage: 0,
    searchQuery: "",
    sortOption: [
      { value: "title", name: "По названию" },
      { value: "body", name: "По содержимому" },
    ],
  }),
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) => {
        return post1[state.selectedSort]?.localeCompare(
          post2[state.selectedSort]
        );
      });
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setLoading(state, bool) {
      state.isLoading = bool;
    },
    setPage(state, page) {
      state.page = page;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setTotalPage(state, totalPage) {
      state.totalPage = totalPage;
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit("setLoading", true);
        setTimeout(async () => {
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts",
            {
              params: {
                _page: state.page,
                _limit: state.limit,
              },
            }
          );
          commit(
            "setTotalPage",
            Math.ceil(response.headers["x-total-count"] / state.limit)
          );
          commit("setPosts", response.data);
          commit("setLoading", false);
        }, 1000);
      } catch (error) {
        alert("Error");
      }
    },
    async loadMorePosts({ state, commit }) {
      try {
        commit("setPage", (state.page += 1));
        setTimeout(async () => {
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts",
            {
              params: {
                _page: state.page,
                _limit: state.limit,
              },
            }
          );
          commit(
            "setTotalPage",
            Math.ceil(response.headers["x-total-count"] / state.limit)
          );
          commit("setPosts", [...state.posts, ...response.data]);
          commit("setLoading", false);
        }, 1000);
      } catch (error) {
        alert("Error");
      }
    },
  },
  namespaced: true,
};
