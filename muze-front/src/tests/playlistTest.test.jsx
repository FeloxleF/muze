import { expect, test } from "vitest";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { SongsProvider, SongsContext } from "../services/SongContext";

export function sum(a, b) {
  return a + b;
}

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

const TestComponent = () => {
  const { favoriteSongs, addFavoriteSong } = React.useContext(SongsContext);

  return (
    <div>
      <button
        onClick={() => {
          addFavoriteSong(1);
          console.log("Song added: ", favoriteSongs);
        }}
      >
        Add Song 1
      </button>
      <div data-testid="favorites">{JSON.stringify(favoriteSongs)}</div>
    </div>
  );
};

// ***** test ajout dans la liste favoriteSongs *****

test("addFavoriteSong adds a song to the favorite songs", async () => {
  render(
    <SongsProvider>
      <TestComponent />
    </SongsProvider>
  );

  expect(screen.getByTestId("favorites")).toBeTruthy();
  expect(screen.getByTestId("favorites").textContent).toBe("[]");

  screen.getByText("Add Song 1").click();

  await waitFor(() =>
    expect(screen.getByTestId("favorites").textContent).toBe("[1]")
  );
});

test("addFavoriteSong does not add the same song twice", async () => {
  render(
    <SongsProvider>
      <TestComponent />
    </SongsProvider>
  );

  screen.getByText("Add Song 1").click();
  await waitFor(() =>
    expect(screen.getByTestId("favorites").textContent).toBe("[1]")
  );

  screen.getByText("Add Song 1").click();

  await waitFor(() =>
    expect(screen.getByTestId("favorites").textContent).toBe("[1]")
  );
});

// ***** test handlePlaylistClick *****

import { fireEvent } from "@testing-library/react";
import useSelectedPlaylist from "../hook/useSelectedPlaylist"; // Le hook où se trouve `handlePlaylistClick`
import { fetchPlaylist } from "../api";

// Mock fetchPlaylist dans le bon contexte
vi.mock("../api", () => ({
  fetchPlaylist: vi.fn(), // On initialise la fonction mockée ici
}));

const TestComponent2 = ({ playlistId }) => {
  const { selectedPlaylist, handlePlaylistClick } = useSelectedPlaylist();

  return (
    <div>
      <button onClick={() => handlePlaylistClick(playlistId)}>
        Load Playlist
      </button>
      {selectedPlaylist && (
        <div data-testid="playlist-name">{selectedPlaylist.name}</div>
      )}
    </div>
  );
};

test("handlePlaylistClick fetches playlist and sets selected playlist", async () => {
  const playlistId = 5;

  const mockPlaylistData = {
    id: 5,
    name: "play",
    song: [
      { id: 4, name: "French Wine", artist: "Biga Ranx" },
      { id: 21, name: "Time", artist: "Pink Floyd" },
    ],
  };

  // Configurer le mock pour retourner les données simulées
  vi.mocked(fetchPlaylist).mockResolvedValueOnce(mockPlaylistData);

  render(<TestComponent2 playlistId={playlistId} />);

  // Cliquer sur le bouton pour charger la playlist
  fireEvent.click(screen.getByText("Load Playlist"));

  await waitFor(() => {
    expect(screen.getByTestId("playlist-name").textContent).to.equal("play");
  });
});
