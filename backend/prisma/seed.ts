import { prisma } from "./client.ts";

async function main() {
  await prisma.log.createMany({
    data: [
      {
        level: "Info",
        message: "Application started",
        meta: { user: "system" },
      },
      {
        level: "Warn",
        message: "High memory usage detected",
        meta: { memory: "85%" },
      },
      {
        level: "Error",
        message: "Database connection failed",
        meta: { retry: 3 },
      },
    ],
  });

  console.log("Seeding completed.");
}

main()
.catch((e) => {
	console.error("Error seeding database:", e);
})
.finally(async () => {
	await prisma.$disconnect();
});
