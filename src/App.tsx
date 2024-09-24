// import React from "react";
// import { RichTextEditor } from "./components/EditorWrapper";
// import { ChakraProvider } from "@chakra-ui/react";
// import "./App.css";

// function App() {
//   return (
//     <ChakraProvider>
//       <RichTextEditor />
//     </ChakraProvider>
//   );
// }

// export default App;
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { RichTextEditor } from "./components/RichTextEditor";
import Form from "./components/Form";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 0,
    },
  },
});

export default function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Form />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
