/** @format */

import type { PageServerLoad } from "./$types";

enum ModType {
    BootstrapperTheme = 0,
    RobloxMod = 1,
}

interface Manifest {
    title: string;
    version: string;
    type: ModType;
    author: string;
    description: string;
}

export interface Mod {
    id: string;
    type: ModType;
    category: string;
    title: string;
    description: string;
    author: string;
    image: string;
    authorImage: string;
    href: string;
}

export interface PageData {
    mods: Mod[];
}

const prerender = true;

export const load: PageServerLoad = async ({ fetch }): Promise<PageData> => {
    const repo = "fishstrap/mods";
    const branch = "main";
    const treeUrl = `https://api.github.com/repos/${repo}/git/trees/${branch}?recursive=1`;

    try {
        const res = await fetch(treeUrl);
        const data = await res.json();

        if (!data.tree) {
            return { mods: [] };
        }

        const manifestFiles = data.tree.filter((item: { path: string }) =>
            item.path.endsWith("manifest.json"),
        );

        // zed generated this for me and it works so...
        const mods: Mod[] = await Promise.all(
            manifestFiles.map(async (item: { path: string }): Promise<Mod> => {
                const dirPath = item.path.replace("/manifest.json", "");
                const folderName = dirPath.split("/").pop() || "";
                const rawUrl = `https://raw.githubusercontent.com/${repo}/${branch}/${item.path}`;

                const manifestRes = await fetch(rawUrl);
                const manifest: Manifest = manifestRes.ok
                    ? await manifestRes.json()
                    : {};

                const typeValue: ModType =
                    manifest.type !== undefined
                        ? manifest.type
                        : ModType.RobloxMod;

                const categoryName =
                    typeValue === ModType.BootstrapperTheme
                        ? "Bootstrapper Themes"
                        : "Roblox Mods";

                return {
                    id: dirPath,
                    type: typeValue,
                    category: categoryName,
                    title: manifest.title || folderName,
                    description:
                        manifest.description || "No description provided.",
                    author: manifest.author || "Unknown",
                    image: `https://raw.githubusercontent.com/${repo}/${branch}/${dirPath}/preview.webp`,
                    authorImage: `https://raw.githubusercontent.com/${repo}/${branch}/${dirPath}/author.webp`,
                    href: `https://raw.githubusercontent.com/${repo}/${branch}/${dirPath}/${folderName}.zip`,
                };
            }),
        );

        mods.sort((a, b) => a.type - b.type);

        return { mods };
    } catch (error) {
        return { mods: [] };
    }
};
