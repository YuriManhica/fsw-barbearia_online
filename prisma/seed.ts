const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    // Barbearias com e-mails profissionais
    const barbershops = [
      {
        name: "Barbearia Zizou",
        address: "Avenida Josina Machel, Maputo.",
        imageUrl:
          "https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CLm9C9GfNpBi2n8AQDuF9koMjeOVz07yHcqLEX",
        email: "reservas@zizoubarber.co.mz",
        phone: "+258 86 456 7890",
      },
      {
        name: "Zulu's BarberShop",
        address: "Avenida Dom Alexandre, Mahotas, Maputo.",
        imageUrl:
          "https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CLjaYGRSdoAFPm5kCJVeXv3Y0HSxMQKynB7dDW",
        email: "agendamento@zulubarber.co.mz",
        phone: "+258 85 890 1234",
      },
      {
        name: "Tsemeta Barber Shop",
        address: "Localizada em Marracuene, Bairro Mateque.",
        imageUrl:
          "https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CLcSCX2aguPCISKz5DU0Eh4gfrYdp6TmlGQoAk",
        email: "cortes@tsemetabarber.co.mz",
        phone: "+258 87 012 3456",
      },
      {
        name: "Barber Shopline",
        address: "Avenida Albert Lithuli, Maputo.",
        imageUrl:
          "https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CLS2P4IMinBUFVa3E5ZLsrN8pzkOCqdexR0gXc",
        email: "contato@shoplinebarber.co.mz",
        phone: "+258 84 678 9012",
      },
      {
        name: "Sexy Hair",
        address: "Avenida Vladimir Lenine, nº 459, Maputo.",
        imageUrl:
          "https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CLP0JOtm63tmIJLPASQKWOFMsw4ev6EHqjy7hD",
        email: "estilo@sexyhair.co.mz",
        phone: "+258 85 345 6789",
      },
      {
        name: "Barbearia Salão Azul Chimunuane",
        address: "Avenida Vladimir Lenine, nº 459, Maputo",
        imageUrl:
          "https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CLJwqMrJs1xWgCzZfL4tSjVnAhNwIKdypBE92v",
        email: "salaoazul@chimunuane.co.mz",
        phone: "+258 82 234 5678",
      },
      {
        name: "Tchetcho's Barber Shop",
        address: "Avenida Salvador Allende",
        imageUrl:
          "https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CLEGmTDXbWBDrHNlkZ671oFJq2IfGUwCjyX83S",
        email: "tchetcho@barber.co.mz",
        phone: "+258 86 901 2345",
      },
      {
        name: "Oficina de Cortes Mandrax",
        address: "Avenida Amílcar Cabral, Maputo.",
        imageUrl:
          "https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CL7dQ400J2QfLWFqYERTJxVjehCtgy89BmbnPi",
        email: "oficina@mandraxbarber.co.mz",
        phone: "+258 82 789 0123",
      },
      {
        name: "Leo's Barber Shop",
        address: "Avenida Albert Lithuli, Maputo.",
        imageUrl:
          "https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CL2oTGESjAJn7hlrUqQvfDOKPc6d5iXeTBWp9u",
        email: "leo@barbershop.co.mz",
        phone: "+258 87 567 8901",
      },
      {
        name: "Gentleman's Barber Shop",
        address: "Avenida Ahmed Sekou Touré, nº 409, Maputo",
        imageUrl:
          "https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CL2idJf4jAJn7hlrUqQvfDOKPc6d5iXeTBWp9u",
        email: "gentleman@barber.co.mz",
        phone: "+258 84 123 4567",
      },
    ];

    // Serviços com imagens
    const services = [
      {
        name: "Corte de Cabelo",
        description: "Estilo personalizado com as últimas tendências.",
        price: 160.0,
        imageUrl:
          "https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png",
      },
      {
        name: "Barba",
        description: "Modelagem completa para destacar sua masculinidade.",
        price: 140.0,
        imageUrl:
          "https://utfs.io/f/e6bdffb6-24a9-455b-aba3-903c2c2b5bde-1jo6tu.png",
      },
      {
        name: "Pézinho",
        description: "Acabamento perfeito para um visual renovado.",
        price: 135.0,
        imageUrl:
          "https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png",
      },
      {
        name: "Sobrancelha",
        description: "Expressão acentuada com modelagem precisa.",
        price: 120.0,
        imageUrl:
          "https://utfs.io/f/2118f76e-89e4-43e6-87c9-8f157500c333-b0ps0b.png",
      },
      {
        name: "Massagem",
        description: "Relaxe com uma massagem revigorante.",
        price: 150.0,
        imageUrl:
          "https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen2a.png",
      },
      {
        name: "Hidratação",
        description: "Hidratação profunda para cabelo e barba.",
        price: 125.0,
        imageUrl:
          "https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png",
      },
    ];

    // Criar barbearias e serviços
    for (const shop of barbershops) {
      const createdShop = await prisma.barbershop.create({
        data: {
          name: shop.name,
          address: shop.address,
          imageUrl: shop.imageUrl,
          email: shop.email,
          phone: shop.phone,
        },
      });

      // Criar serviços para cada barbearia
      for (const service of services) {
        await prisma.service.create({
          data: {
            name: service.name,
            description: service.description,
            price: service.price,
            imageUrl: service.imageUrl,
            barbershop: { connect: { id: createdShop.id } },
          },
        });
      }
    }

    console.log("Seed concluído com sucesso!");
    await prisma.$disconnect();
  } catch (error) {
    console.error("Erro ao executar o seed:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

seedDatabase();
