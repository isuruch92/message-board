import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";

const DEFAULT_BASE_URL = "http://localhost:8080";
const BASE_URL = process.env.REACT_APP_BASE_URL || DEFAULT_BASE_URL;

const ChannelsContext = createContext();

const initialState = {
  channels: [],
  isLoading: false,
  error: null,
  searchQuery: "",
  currentChannel: null,
  currentChannelMessages: [],
  filteredMessages: [],
  navPanelSize: 32,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "channels/loaded":
      return { ...state, isLoading: false, channels: action.payload };
    case "messeges/loaded":
      return {
        ...state,
        isLoading: false,
        searchQuery: "",
        currentChannel: state.channels.find(
          (c) => c.id === Number(action.payload.channelId)
        ),
        currentChannelMessages: action.payload.data,
        filteredMessages: action.payload.data,
      };
    case "message/created":
      return {
        ...state,
        isLoading: false,
        currentChannelMessages: [
          ...state.currentChannelMessages,
          action.payload,
        ],
        filteredMessages: [...state.currentChannelMessages, action.payload],
      };
    case "message/filtered":
      return {
        ...state,
        searchQuery: action.payload,
        filteredMessages: state.currentChannelMessages.filter((message) =>
          message.text.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    case "panel/resized":
      return {
        ...state,
        navPanelSize: action.payload,
      };
    case "message/deleted":
      return state;
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
}

function ChannelsProvider({ children }) {
  const [
    {
      channels,
      isLoading,
      error,
      currentChannelMessages,
      filteredMessages,
      searchQuery,
      currentChannel,
      navPanelSize,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    async function fetchChannels() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/channels`);

        if (res.ok) {
          const data = await res.json();
          dispatch({ type: "channels/loaded", payload: data });
        } else {
          throw new Error();
        }
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: {
            type: "chn-fetch",
            message: "Something went wrong fetching channels..!",
          },
        });
      }
    }
    fetchChannels();
  }, []);

  const fetchMessages = useCallback(async function fetchMessages(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/messages/${id}`);

      if (res.ok) {
        const data = await res.json();
        dispatch({ type: "messeges/loaded", payload: { channelId: id, data } });
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: {
          type: "msg-fetch",
          message: "Something went wrong fetching messages!",
        },
      });
    }
  }, []);

  async function createMessage(newMessage, channelId) {
    dispatch({ type: "loading" });

    try {
      const response = await fetch(`${BASE_URL}/${channelId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });

      if (response.ok) {
        dispatch({ type: "message/created", payload: newMessage });
      } else {
        dispatch({
          type: "rejected",
          payload: { type: "msg-create", message: "Failed to create message." },
        });
      }
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: { type: "msg-create", message: "Failed to create message." },
      });
    }
  }

  function setSearchQuery(value) {
    dispatch({ type: "message/filtered", payload: value });
  }

  function setNavPanelSize(size) {
    dispatch({ type: "panel/resized", payload: size });
  }

  return (
    <ChannelsContext.Provider
      value={{
        channels,
        isLoading,
        error,
        currentChannelMessages,
        filteredMessages,
        fetchMessages,
        createMessage,
        searchQuery,
        setSearchQuery,
        currentChannel,
        navPanelSize,
        setNavPanelSize,
      }}
    >
      {children}
    </ChannelsContext.Provider>
  );
}

function useChannels() {
  const context = useContext(ChannelsContext);

  if (!context) {
    throw new Error("context was used outside of the ChannelsProvider");
  }

  return context;
}

export { ChannelsProvider, useChannels };
