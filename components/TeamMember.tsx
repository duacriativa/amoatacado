import Image from 'next/image';

interface TeamMemberProps {
    name: string;
    role: string;
    imageSrc: string;
}

export default function TeamMember({ name, role, imageSrc }: TeamMemberProps) {
    return (
        <div className="flex flex-col items-center">
            <div className="relative mb-4 h-64 w-64 overflow-hidden rounded-2xl shadow-lg transition-transform hover:scale-105">
                <Image
                    src={imageSrc}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{name}</h3>
            <p className="text-blue-600 font-medium">{role}</p>
        </div>
    );
}
