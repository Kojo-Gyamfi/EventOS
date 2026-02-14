
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('--- Database Connection Diagnostic ---');
    console.log('Attempting to connect via Prisma...');

    try {
        const start = Date.now();
        const result = await prisma.$queryRaw`SELECT 1 as connected`;
        const end = Date.now();

        console.log('SUCCESS: Connection established.');
        console.log(`Latency: ${end - start}ms`);
        console.log('Data:', result);

        // Check if the Event table exists/is accessible
        const eventCount = await prisma.event.count();
        console.log(`Event records found: ${eventCount}`);

    } catch (error) {
        console.error('FAILURE: Could not connect to database.');
        console.error('Error Code:', error.code);
        console.error('Error Message:', error.message);

        if (error.code === 'P1001') {
            console.log('\nPossible causes for P1001:');
            console.log('1. The database project is paused (check Supabase dashboard).');
            console.log('2. Network firewall is blocking port 6543.');
            console.log('3. IPv6 compatibility issues (Supabase uses IPv6).');
            console.log('4. Incorrect host or credentials.');
        }
    } finally {
        await prisma.$disconnect();
    }
}

main();
