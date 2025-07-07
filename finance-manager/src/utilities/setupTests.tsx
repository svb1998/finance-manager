import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";

const createTestQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                gcTime: Infinity,
            },
        },
    });

type WrapperProps = {
    children: React.ReactNode;
};

function customRender(ui: React.ReactElement, options?: any) {
    const queryClient = createTestQueryClient();
    const Wrapper: React.FC<WrapperProps> = ({ children }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
    return render(ui, { wrapper: Wrapper, ...options });
}

export * from "@testing-library/react";
export { customRender as render };
