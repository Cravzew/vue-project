import { onMounted, ref } from "vue";
import axios from "axios";

export default function usePosts(limit) {
  const posts = ref([]);
  const totalPage = ref(0);
  const isLoading = ref(true);
  const fetching = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: {
            _page: 1,
            _limit: limit,
          },
        }
      );
      totalPage.value = Math.ceil(response.headers["x-total-count"] / limit);
      posts.value = response.data;
      isLoading.isLoading = false;
    } catch (error) {
      alert("Error");
    }
  };
  onMounted(fetching);
  return {
    posts,
    isLoading,
    totalPage,
  };
}
