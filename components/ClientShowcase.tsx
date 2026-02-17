import Image from 'next/image';

interface ClientShowcaseProps {
    clients: {
        name: string;
        logoSrc: string;
    }[];
}

export default function ClientShowcase({ clients }: ClientShowcaseProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-items-center">
            {clients.map((client, index) => (
                <div key={index} className="relative h-24 w-40 grayscale transition-all hover:grayscale-0 hover:scale-110">
                    <Image
                        src={client.logoSrc}
                        alt={client.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 50vw, 25vw"
                    />
                </div>
            ))}
        </div>
    );
}
