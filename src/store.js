export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    favorites: [] 
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'add_task': {
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        ),
      };
    }

    case 'add_favorite': {
      const newFavorite = action.payload; // nombre del Pokémon
      if (store.favorites.includes(newFavorite)) return store; // evita duplicados
      return {
        ...store,
        favorites: [...store.favorites, newFavorite],
      };
    }

    case 'remove_favorite': {
      const toRemove = action.payload;
      return {
        ...store,
        favorites: store.favorites.filter((fav) => fav !== toRemove),
      };
    }

    default:
      throw Error('Unknown action.');
  }
}
