import React from "react";

export default function About() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className="text-3xl font-semibold text-center my-7">About Irumi's Blog</h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            <p>
              Irumi's Blog is a blog that I created to share my throughts and
              ideas with the world. I am a undergraduate and I am exited to get
              some wonderful experiences about Computer Science.
            </p>
            <p>I hope you enjoy reading my blog.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
