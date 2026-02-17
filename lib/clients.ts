import fs from 'fs';
import path from 'path';
import { ClientConfig } from '@/types/client';

const clientsDirectory = path.join(process.cwd(), 'data/clients');

export async function getClientBySlug(slug: string): Promise<ClientConfig | null> {
    const filePath = path.join(clientsDirectory, `${slug}.json`);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    try {
        const data = JSON.parse(fileContents);
        return data as ClientConfig;
    }
    catch (error) {
        console.error(`Error parsing client data for slug: ${slug}`, error);
        return null;
    }
}

export async function getAllClients(): Promise<ClientConfig[]> {
    if (!fs.existsSync(clientsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(clientsDirectory);
    const clients = fileNames.map((fileName) => {
        const filePath = path.join(clientsDirectory, fileName);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContents) as ClientConfig;
    });

    return clients;
}
