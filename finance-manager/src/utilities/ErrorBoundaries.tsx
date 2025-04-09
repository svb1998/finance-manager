import React from "react";

interface Props {
    children: React.ReactNode;
    fallback: React.ReactNode;
    resetCondition?: any;
}
interface State {
    hasError: boolean;
    resetCondition?: any;
}

//ErrorBoundary component must be created as a class component.
export class ErrorBoundary extends React.Component<Props, State> {
    //! REMEMBER: When we extend a class, we have tu add super(props) in the constructor
    constructor(props: Props) {
        super(props);

        //With this state we can check if there is an error.
        //we also add the resetCondition, which will be used to check if it has changed and depending on it, it will reset the error state.
        this.state = { hasError: false, resetCondition: props.resetCondition };
    }

    //We indicate that ther has been an error in a subcomponent.
    //we receive the error as a parameter in case we want to do something with it.
    static getDerivedStateFromError(error: Error) {
        return { hasError: true };
    }

    //We check if the component has changed, and if it has, we reset the error state.
    //In resetCondition we will put the condition variable we want to re-check.
    //We receive the props and the state as parameters.
    static getDerivedStateFromProps(props: Props, state: State) {
        if (props.resetCondition !== state.resetCondition) {
            return { hasError: false, resetCondition: props.resetCondition };
        }
        return null;
    }

    // render the component, and if we have an error we return the fallback component. Otherwise we return the children
    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}
