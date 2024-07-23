// const mongoose = require("mongoose");

const sampleListings = [
  {
    title: "Your Sample Listing 1",
    description: "This is a sample description 1",
    image: {
      filename: "house1.jpg",
      url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1665&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: 1000,
    location: "Sample Location 1",
    country: "Sample Country 1",
  },
  {
    title: "Your Sample Listing 2",
    description: "This is a sample description 2",
    image: {
      filename: "apartment2.jpg",
      url: "https://images.unsplash.com/photo-1522708323590-3f2075f5a832?q=80&w=1665&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: 800,
    location: "Sample Location 2",
    country: "Sample Country 2",
  },
  {
    title: "Your Sample Listing 3",
    description: "This is a sample description 3",
    image: {
      filename: "condo3.jpg",
      url: "https://images.unsplash.com/photo-1519125323398-675f0ddbffb7?q=80&w=1665&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: 1200,
    location: "Sample Location 3",
    country: "Sample Country 3",
  },
  {
    title: "Your Sample Listing 4",
    description: "This is a sample description 4",
    image: {
      filename: "mansion4.jpg",
      url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1665&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: 1500,
    location: "Sample Location 4",
    country: "Sample Country 4",
  },
  {
    title: "Your Sample Listing 5",
    description: "This is a sample description 5",
    image: {
      filename: "cabin5.jpg",
      url: "https://images.unsplash.com/photo-1513151233636-8cfbea3f3a1f?q=80&w=1665&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: 900,
    location: "Sample Location 5",
    country: "Sample Country 5",
  },
];

module.exports = { data: sampleListings };
