// stores/cardStore.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCardStore = defineStore("card", () => {
  const cards = ref([
    {
      id: 1,
      title: "غافلگیری مخاطب",
      description:
        "برند خلاقانه و بامزه وارد داستان می‌شود و لبخند را جلب می‌کند.",
      icon: "smiley-x-eyes-duotone",
    },
    {
      id: 2,
      title: "ماندگاری",
      description: "برند در داستان طنز، مثل یک جوک خوب در ذهن می‌ماند.",
      icon: "brain-duotone",
    },
    {
      id: 3,
      title: "ارتباط احساسی",
      description: "حضور در موقعیت طنز، حس مثبت و صمیمیت برند را تقویت می‌کند.",
      icon: "heartbeat-duotone",
    },
    {
      id: 4,
      title: "تعامل بیشتر",
      description:
        "اشاره مستقیم، بحث‌برانگیز است و تعامل مخاطبان را افزایش می‌دهد.",
      icon: "armchair-duotone",
    },
  ]);

  function updateOrder(newOrder) {
    cards.value = [...newOrder];
  }

  return {
    cards,
    updateOrder,
  };
});
