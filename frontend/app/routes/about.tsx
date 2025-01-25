import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About" },
    { name: "description", content: "Welcome to About page!" },
  ];
}

export default function About() {
  return <div>About page</div>;
}
