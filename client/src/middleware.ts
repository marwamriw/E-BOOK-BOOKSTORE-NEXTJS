export { default } from "next-auth/middleware";

export const config = { matcher: ["/", "/contact","/allBooks","/allBooks/:id","/profile","/admin","/admin/users",
    "/admin/books","/admin/message" ,"/favoris" , "/myBooks"] };