import { useIntuitionStore } from "../../stores/useIntuitionStore";

export const getPublicScreenId = () => {
    const { publicScreen } = useIntuitionStore.getState();
    return publicScreen;
};