export const getAccessTokenFromHeaders = ({ authorization }: { authorization?: string }) => ({
    token: authorization?.split(" ")[1],
});
