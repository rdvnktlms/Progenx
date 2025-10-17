"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface ChessPiece {
  type: 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
  color: 'white' | 'black';
  position: string;
}

interface Puzzle {
  id: number;
  title: string;
  description: string;
  board: ChessPiece[];
  correctMove: string;
  explanation: string;
}

// Satranç taşlarının hareket kuralları
const getPossibleMoves = (piece: ChessPiece, board: ChessPiece[]): string[] => {
  const moves: string[] = [];
  const file = piece.position.charCodeAt(0) - 97;
  const rank = parseInt(piece.position[1]) - 1;

  switch (piece.type) {
    case 'queen':
      // Vezir: Yatay, dikey ve çapraz hareket eder
      for (let i = 1; i < 8; i++) {
        // Sağa
        if (file + i < 8) {
          const pos = String.fromCharCode(97 + file + i) + (rank + 1);
          const blockingPiece = board.find(p => p.position === pos);
          if (blockingPiece) {
            if (blockingPiece.color !== piece.color) moves.push(pos);
            break;
          }
          moves.push(pos);
        }
      }
      for (let i = 1; i < 8; i++) {
        // Sola
        if (file - i >= 0) {
          const pos = String.fromCharCode(97 + file - i) + (rank + 1);
          const blockingPiece = board.find(p => p.position === pos);
          if (blockingPiece) {
            if (blockingPiece.color !== piece.color) moves.push(pos);
            break;
          }
          moves.push(pos);
        }
      }
      for (let i = 1; i < 8; i++) {
        // Yukarı
        if (rank + i < 8) {
          const pos = String.fromCharCode(97 + file) + (rank + i + 1);
          const blockingPiece = board.find(p => p.position === pos);
          if (blockingPiece) {
            if (blockingPiece.color !== piece.color) moves.push(pos);
            break;
          }
          moves.push(pos);
        }
      }
      for (let i = 1; i < 8; i++) {
        // Aşağı
        if (rank - i >= 0) {
          const pos = String.fromCharCode(97 + file) + (rank - i + 1);
          const blockingPiece = board.find(p => p.position === pos);
          if (blockingPiece) {
            if (blockingPiece.color !== piece.color) moves.push(pos);
            break;
          }
          moves.push(pos);
        }
      }
      // Çapraz hareketler
      for (let i = 1; i < 8; i++) {
        // Sağ üst
        if (file + i < 8 && rank + i < 8) {
          const pos = String.fromCharCode(97 + file + i) + (rank + i + 1);
          const blockingPiece = board.find(p => p.position === pos);
          if (blockingPiece) {
            if (blockingPiece.color !== piece.color) moves.push(pos);
            break;
          }
          moves.push(pos);
        }
      }
      for (let i = 1; i < 8; i++) {
        // Sol üst
        if (file - i >= 0 && rank + i < 8) {
          const pos = String.fromCharCode(97 + file - i) + (rank + i + 1);
          const blockingPiece = board.find(p => p.position === pos);
          if (blockingPiece) {
            if (blockingPiece.color !== piece.color) moves.push(pos);
            break;
          }
          moves.push(pos);
        }
      }
      for (let i = 1; i < 8; i++) {
        // Sağ alt
        if (file + i < 8 && rank - i >= 0) {
          const pos = String.fromCharCode(97 + file + i) + (rank - i + 1);
          const blockingPiece = board.find(p => p.position === pos);
          if (blockingPiece) {
            if (blockingPiece.color !== piece.color) moves.push(pos);
            break;
          }
          moves.push(pos);
        }
      }
      for (let i = 1; i < 8; i++) {
        // Sol alt
        if (file - i >= 0 && rank - i >= 0) {
          const pos = String.fromCharCode(97 + file - i) + (rank - i + 1);
          const blockingPiece = board.find(p => p.position === pos);
          if (blockingPiece) {
            if (blockingPiece.color !== piece.color) moves.push(pos);
            break;
          }
          moves.push(pos);
        }
      }
      break;
    
    case 'rook':
      // Kale: Yatay ve dikey hareket eder
      for (let i = 1; i < 8; i++) {
        // Sağa
        if (file + i < 8) {
          const pos = String.fromCharCode(97 + file + i) + (rank + 1);
          const blockingPiece = board.find(p => p.position === pos);
          if (blockingPiece) {
            if (blockingPiece.color !== piece.color) moves.push(pos);
            break;
          }
          moves.push(pos);
        }
      }
      for (let i = 1; i < 8; i++) {
        // Sola
        if (file - i >= 0) {
          const pos = String.fromCharCode(97 + file - i) + (rank + 1);
          const blockingPiece = board.find(p => p.position === pos);
          if (blockingPiece) {
            if (blockingPiece.color !== piece.color) moves.push(pos);
            break;
          }
          moves.push(pos);
        }
      }
      for (let i = 1; i < 8; i++) {
        // Yukarı
        if (rank + i < 8) {
          const pos = String.fromCharCode(97 + file) + (rank + i + 1);
          const blockingPiece = board.find(p => p.position === pos);
          if (blockingPiece) {
            if (blockingPiece.color !== piece.color) moves.push(pos);
            break;
          }
          moves.push(pos);
        }
      }
      for (let i = 1; i < 8; i++) {
        // Aşağı
        if (rank - i >= 0) {
          const pos = String.fromCharCode(97 + file) + (rank - i + 1);
          const blockingPiece = board.find(p => p.position === pos);
          if (blockingPiece) {
            if (blockingPiece.color !== piece.color) moves.push(pos);
            break;
          }
          moves.push(pos);
        }
      }
      break;
    
    case 'bishop':
      // Fil: Çapraz hareket eder
      for (let i = 1; i < 8; i++) {
        // Sağ üst
        if (file + i < 8 && rank + i < 8) {
          const pos = String.fromCharCode(97 + file + i) + (rank + i + 1);
          const blockingPiece = board.find(p => p.position === pos);
          if (blockingPiece) {
            if (blockingPiece.color !== piece.color) moves.push(pos);
            break;
          }
          moves.push(pos);
        }
      }
      for (let i = 1; i < 8; i++) {
        // Sol üst
        if (file - i >= 0 && rank + i < 8) {
          const pos = String.fromCharCode(97 + file - i) + (rank + i + 1);
          const blockingPiece = board.find(p => p.position === pos);
          if (blockingPiece) {
            if (blockingPiece.color !== piece.color) moves.push(pos);
            break;
          }
          moves.push(pos);
        }
      }
      for (let i = 1; i < 8; i++) {
        // Sağ alt
        if (file + i < 8 && rank - i >= 0) {
          const pos = String.fromCharCode(97 + file + i) + (rank - i + 1);
          const blockingPiece = board.find(p => p.position === pos);
          if (blockingPiece) {
            if (blockingPiece.color !== piece.color) moves.push(pos);
            break;
          }
          moves.push(pos);
        }
      }
      for (let i = 1; i < 8; i++) {
        // Sol alt
        if (file - i >= 0 && rank - i >= 0) {
          const pos = String.fromCharCode(97 + file - i) + (rank - i + 1);
          const blockingPiece = board.find(p => p.position === pos);
          if (blockingPiece) {
            if (blockingPiece.color !== piece.color) moves.push(pos);
            break;
          }
          moves.push(pos);
        }
      }
      break;
    
    case 'knight':
      // At: L şeklinde hareket eder
      const knightMoves = [
        [2, 1], [2, -1], [-2, 1], [-2, -1],
        [1, 2], [1, -2], [-1, 2], [-1, -2]
      ];
      knightMoves.forEach(([df, dr]) => {
        const newFile = file + df;
        const newRank = rank + dr;
        if (newFile >= 0 && newFile < 8 && newRank >= 0 && newRank < 8) {
          const pos = String.fromCharCode(97 + newFile) + (newRank + 1);
          const blockingPiece = board.find(p => p.position === pos);
          if (!blockingPiece || blockingPiece.color !== piece.color) {
            moves.push(pos);
          }
        }
      });
      break;
    
    case 'king':
      // Şah: Bir kare her yöne hareket eder
      for (let df = -1; df <= 1; df++) {
        for (let dr = -1; dr <= 1; dr++) {
          if (df === 0 && dr === 0) continue;
          const newFile = file + df;
          const newRank = rank + dr;
          if (newFile >= 0 && newFile < 8 && newRank >= 0 && newRank < 8) {
            const pos = String.fromCharCode(97 + newFile) + (newRank + 1);
            const blockingPiece = board.find(p => p.position === pos);
            if (!blockingPiece || blockingPiece.color !== piece.color) {
              moves.push(pos);
            }
          }
        }
      }
      break;
    
    case 'pawn':
      // Piyon: İleri hareket eder, çapraz alır
      if (piece.color === 'white') {
        // İleri
        if (rank + 1 < 8) {
          const pos = String.fromCharCode(97 + file) + (rank + 2);
          const blockingPiece = board.find(p => p.position === pos);
          if (!blockingPiece) {
            moves.push(pos);
          }
        }
        // İlk hareket 2 kare
        if (rank === 1) {
          const pos = String.fromCharCode(97 + file) + (rank + 3);
          const blockingPiece = board.find(p => p.position === pos);
          if (!blockingPiece) {
            moves.push(pos);
          }
        }
        // Çapraz alma
        if (file + 1 < 8 && rank + 1 < 8) {
          const pos = String.fromCharCode(97 + file + 1) + (rank + 2);
          const blockingPiece = board.find(p => p.position === pos);
          if (blockingPiece && blockingPiece.color === 'black') {
            moves.push(pos);
          }
        }
        if (file - 1 >= 0 && rank + 1 < 8) {
          const pos = String.fromCharCode(97 + file - 1) + (rank + 2);
          const blockingPiece = board.find(p => p.position === pos);
          if (blockingPiece && blockingPiece.color === 'black') {
            moves.push(pos);
          }
        }
      } else {
        // Siyah piyon
        if (rank - 1 >= 0) {
          const pos = String.fromCharCode(97 + file) + rank;
          const blockingPiece = board.find(p => p.position === pos);
          if (!blockingPiece) {
            moves.push(pos);
          }
        }
        if (rank === 6) {
          const pos = String.fromCharCode(97 + file) + (rank - 1);
          const blockingPiece = board.find(p => p.position === pos);
          if (!blockingPiece) {
            moves.push(pos);
          }
        }
        if (file + 1 < 8 && rank - 1 >= 0) {
          const pos = String.fromCharCode(97 + file + 1) + rank;
          const blockingPiece = board.find(p => p.position === pos);
          if (blockingPiece && blockingPiece.color === 'white') {
            moves.push(pos);
          }
        }
        if (file - 1 >= 0 && rank - 1 >= 0) {
          const pos = String.fromCharCode(97 + file - 1) + rank;
          const blockingPiece = board.find(p => p.position === pos);
          if (blockingPiece && blockingPiece.color === 'white') {
            moves.push(pos);
          }
        }
      }
      break;
  }

  return moves;
};

export default function SatranctaTasAlisverisiKonu1Page() {
  const { user } = useAuth();
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<string[]>([]);
  const [userMove, setUserMove] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completedPuzzles, setCompletedPuzzles] = useState<number[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [currentBoard, setCurrentBoard] = useState<ChessPiece[]>([]);
  const [showCoordinates, setShowCoordinates] = useState(true);

  const puzzles: Puzzle[] = [
    {
      id: 1,
      title: "Alıştırma 1: Boştaki Taşı Bulmak",
      description: "Beyazın en iyi taş alış hamlesi nedir?",
      board: [
        // Kitaptaki pozisyon - Alıştırma 1 (Fotoğraftan birebir)
        // Beyaz taşlar (açık renkli, çizgili)
        { type: 'king', color: 'white', position: 'c1' },
        { type: 'queen', color: 'white', position: 'c3' },
        { type: 'rook', color: 'white', position: 'd1' },
        { type: 'bishop', color: 'white', position: 'c5' },
        { type: 'bishop', color: 'white', position: 'c4' },
        { type: 'pawn', color: 'white', position: 'b2' },
        { type: 'pawn', color: 'white', position: 'f3' },
        { type: 'pawn', color: 'white', position: 'f2' },
        { type: 'pawn', color: 'white', position: 'h2' },
        // Siyah taşlar (koyu renkli, dolu)
        { type: 'king', color: 'black', position: 'b8' },
        { type: 'rook', color: 'black', position: 'c8' },
        { type: 'queen', color: 'black', position: 'e8' },
        { type: 'knight', color: 'black', position: 'c6' },
        { type: 'knight', color: 'black', position: 'f6' },
        { type: 'pawn', color: 'black', position: 'a7' },
        { type: 'pawn', color: 'black', position: 'b7' },
        { type: 'pawn', color: 'black', position: 'h8' },
        { type: 'pawn', color: 'black', position: 'g6' }
      ],
      correctMove: 'c3-f6',
      explanation: "Vezir f6'daki savunmasız atı alır. Bu at hiçbir taş tarafından savunulmuyor."
    },
    {
      id: 2,
      title: "Alıştırma 2: Boştaki Taşı Bulmak",
      description: "Beyazın en iyi taş alış hamlesi nedir?",
      board: [
        // Kitaptaki pozisyon - Alıştırma 2 (Fotoğraftan birebir - Düzeltilmiş)
        // Beyaz taşlar (açık renkli, çizgili)
        { type: 'king', color: 'white', position: 'a1' },
        { type: 'rook', color: 'white', position: 'd1' },
        { type: 'rook', color: 'white', position: 'g1' },
        { type: 'pawn', color: 'white', position: 'a2' },
        { type: 'pawn', color: 'white', position: 'b2' },
        { type: 'pawn', color: 'white', position: 'h2' },
        { type: 'knight', color: 'white', position: 'd4' },
        { type: 'pawn', color: 'white', position: 'f5' }, // f4'ten f5'e taşındı
        { type: 'queen', color: 'black', position: 'e5' },
        { type: 'pawn', color: 'white', position: 'g4' }, // f5'ten g4'e taşındı
        { type: 'knight', color: 'white', position: 'g3' },
        // Siyah taşlar (koyu renkli, dolu)
        { type: 'rook', color: 'black', position: 'c8' },
        { type: 'rook', color: 'black', position: 'f8' }, // g8'den f8'e taşındı
        { type: 'king', color: 'black', position: 'h8' },
        { type: 'queen', color: 'white', position: 'a7' },
        { type: 'bishop', color: 'black', position: 'b7' },
        { type: 'pawn', color: 'black', position: 'a6' },
        // e7 piyonu kaldırıldı
        { type: 'pawn', color: 'black', position: 'f7' },
        { type: 'pawn', color: 'black', position: 'g7' },
        { type: 'pawn', color: 'black', position: 'h7' },
        { type: 'pawn', color: 'black', position: 'b5' },
        { type: 'bishop', color: 'black', position: 'f6' } // f6'ya siyah fil eklendi
      ],
      correctMove: 'a7-b7',
      explanation: "Beyaz vezir b7'deki savunmasız siyah fili alır. Bu fil hiçbir taş tarafından savunulmuyor."
    },
    {
      id: 3,
      title: "Alıştırma 3: Boştaki Taşı Bulmak",
      description: "Beyazın en iyi taş alış hamlesi nedir?",
      board: [
        // Kitaptaki pozisyon - Alıştırma 3 (Kullanıcı tarafından verilen pozisyon)
        // Beyaz taşlar (açık renkli, çizgili)
        { type: 'king', color: 'white', position: 'g1' },
        { type: 'queen', color: 'white', position: 'b7' },
        { type: 'knight', color: 'white', position: 'd3' },
        { type: 'pawn', color: 'white', position: 'd4' },
        { type: 'pawn', color: 'white', position: 'f4' },
        { type: 'pawn', color: 'white', position: 'e3' },
        { type: 'pawn', color: 'white', position: 'b2' },
        { type: 'pawn', color: 'white', position: 'g2' },
        { type: 'pawn', color: 'white', position: 'h2' },
        // Siyah taşlar (koyu renkli, dolu)
        { type: 'king', color: 'black', position: 'g6' },
        { type: 'queen', color: 'black', position: 'a2' },
        { type: 'knight', color: 'black', position: 'e4' },
        { type: 'pawn', color: 'black', position: 'a7' },
        { type: 'pawn', color: 'black', position: 'e6' },
        { type: 'pawn', color: 'black', position: 'f6' },
        { type: 'pawn', color: 'black', position: 'g7' },
        { type: 'pawn', color: 'black', position: 'h7' }
      ],
      correctMove: 'd3-e4',
      explanation: "Beyaz at d3'ten e4'teki savunmasız siyah atı alır. Bu at hiçbir taş tarafından savunulmuyor."
    },
    {
      id: 4,
      title: "Alıştırma 4: Boştaki Taşı Bulmak",
      description: "Beyazın en iyi taş alış hamlesi nedir?",
      board: [
        { type: 'rook', color: 'black', position: 'a8' },
        { type: 'queen', color: 'black', position: 'd8' },
        { type: 'rook', color: 'black', position: 'f8' },
        { type: 'king', color: 'black', position: 'g8' },
        { type: 'pawn', color: 'black', position: 'a7' },
        { type: 'bishop', color: 'black', position: 'b7' },
        { type: 'pawn', color: 'black', position: 'f7' },
        { type: 'pawn', color: 'black', position: 'g7' },
        { type: 'pawn', color: 'black', position: 'h7' },
        { type: 'pawn', color: 'black', position: 'e6' },
        { type: 'bishop', color: 'black', position: 'f6' },
        { type: 'pawn', color: 'black', position: 'b5' },
        { type: 'pawn', color: 'white', position: 'c5' },
        { type: 'knight', color: 'black', position: 'b4' },
        { type: 'queen', color: 'white', position: 'c3' },
        { type: 'pawn', color: 'white', position: 'e3' },
        { type: 'pawn', color: 'white', position: 'h3' },
        { type: 'pawn', color: 'white', position: 'a2' },
        { type: 'pawn', color: 'white', position: 'b2' },
        { type: 'knight', color: 'white', position: 'd2' },
        { type: 'bishop', color: 'white', position: 'e2' },
        { type: 'pawn', color: 'white', position: 'f2' },
        { type: 'pawn', color: 'white', position: 'g2' },
        { type: 'bishop', color: 'white', position: 'h2' },
        { type: 'rook', color: 'white', position: 'a1' },
        { type: 'king', color: 'white', position: 'g1' }
      ],
      correctMove: 'c3-b4',
      explanation: "Beyaz vezir b4'teki savunmasız siyah atı alır. Bu at hiçbir taş tarafından savunulmuyor."
    },
    {
      id: 5,
      title: "Alıştırma 5: Boştaki Taşı Bulmak",
      description: "Beyazın en iyi taş alış hamlesi nedir?",
      board: [
        { type: 'rook', color: 'black', position: 'c8' },
        { type: 'rook', color: 'black', position: 'd8' },
        { type: 'king', color: 'black', position: 'g8' },
        { type: 'pawn', color: 'black', position: 'f7' },
        { type: 'pawn', color: 'black', position: 'h7' },
        { type: 'pawn', color: 'black', position: 'a6' },
        { type: 'queen', color: 'black', position: 'b6' },
        { type: 'pawn', color: 'black', position: 'e6' },
        { type: 'pawn', color: 'black', position: 'g6' },
        { type: 'queen', color: 'white', position: 'e5' },
        { type: 'pawn', color: 'white', position: 'a4' },
        { type: 'pawn', color: 'black', position: 'b4' },
        { type: 'knight', color: 'white', position: 'd4' },
        { type: 'bishop', color: 'black', position: 'e4' },
        { type: 'pawn', color: 'white', position: 'c3' },
        { type: 'pawn', color: 'white', position: 'b2' },
        { type: 'rook', color: 'white', position: 'd2' },
        { type: 'pawn', color: 'white', position: 'f2' },
        { type: 'pawn', color: 'white', position: 'g2' },
        { type: 'pawn', color: 'white', position: 'h2' },
        { type: 'rook', color: 'white', position: 'a1' },
        { type: 'king', color: 'white', position: 'g1' }
      ],
      correctMove: 'e5-e4',
      explanation: "Beyaz vezir e4'teki savunmasız siyah fili alır. Bu fil hiçbir taş tarafından savunulmuyor."
    },
    {
      id: 6,
      title: "Alıştırma 6: Boştaki Taşı Bulmak",
      description: "Beyazın en iyi taş alış hamlesi nedir?",
      board: [
        { type: 'bishop', color: 'black', position: 'b8' },
        { type: 'rook', color: 'black', position: 'c8' },
        { type: 'king', color: 'black', position: 'g8' },
        { type: 'bishop', color: 'black', position: 'b7' },
        { type: 'knight', color: 'black', position: 'e7' },
        { type: 'pawn', color: 'black', position: 'f7' },
        { type: 'pawn', color: 'black', position: 'h7' },
        { type: 'pawn', color: 'black', position: 'a6' },
        { type: 'bishop', color: 'white', position: 'b6' },
        { type: 'pawn', color: 'black', position: 'e6' },
        { type: 'pawn', color: 'black', position: 'g6' },
        { type: 'knight', color: 'black', position: 'a5' },
        { type: 'pawn', color: 'black', position: 'b5' },
        { type: 'pawn', color: 'white', position: 'e5' },
        { type: 'pawn', color: 'white', position: 'f4' },
        { type: 'pawn', color: 'white', position: 'b3' },
        { type: 'knight', color: 'white', position: 'c3' },
        { type: 'pawn', color: 'white', position: 'g3' },
        { type: 'pawn', color: 'white', position: 'a2' },
        { type: 'pawn', color: 'white', position: 'c2' },
        { type: 'knight', color: 'white', position: 'e2' },
        { type: 'bishop', color: 'white', position: 'g2' },
        { type: 'pawn', color: 'white', position: 'h2' },
        { type: 'king', color: 'white', position: 'g1' }
      ],
      correctMove: 'b6-a5',
      explanation: "Beyaz fil a5'teki savunmasız siyah atı alır. Bu at hiçbir taş tarafından savunulmuyor."
    },
    {
      id: 7,
      title: "Alıştırma 7: Boştaki Taşı Bulmak",
      description: "Beyazın en iyi taş alış hamlesi nedir?",
      board: [
        { type: 'rook', color: 'black', position: 'a8' },
        { type: 'bishop', color: 'black', position: 'c8' },
        { type: 'rook', color: 'black', position: 'e8' },
        { type: 'pawn', color: 'black', position: 'a7' },
        { type: 'pawn', color: 'black', position: 'b7' },
        { type: 'pawn', color: 'black', position: 'c7' },
        { type: 'pawn', color: 'black', position: 'f7' },
        { type: 'king', color: 'black', position: 'g7' },
        { type: 'pawn', color: 'black', position: 'g6' },
        { type: 'pawn', color: 'black', position: 'h6' },
        { type: 'queen', color: 'black', position: 'd5' },
        { type: 'knight', color: 'white', position: 'd4' },
        { type: 'knight', color: 'white', position: 'b3' },
        { type: 'pawn', color: 'white', position: 'c3' },
        { type: 'knight', color: 'black', position: 'd3' },
        { type: 'pawn', color: 'white', position: 'f3' },
        { type: 'pawn', color: 'white', position: 'a2' },
        { type: 'pawn', color: 'white', position: 'b2' },
        { type: 'pawn', color: 'white', position: 'g2' },
        { type: 'pawn', color: 'white', position: 'h2' },
        { type: 'rook', color: 'white', position: 'a1' },
        { type: 'queen', color: 'white', position: 'd1' },
        { type: 'rook', color: 'white', position: 'f1' },
        { type: 'king', color: 'white', position: 'g1' }
      ],
      correctMove: 'd1-d3',
      explanation: "Beyaz vezir d3'teki savunmasız siyah atı alır. Bu at hiçbir taş tarafından savunulmuyor."
    },
    {
      id: 8,
      title: "Alıştırma 8: Boştaki Taşı Bulmak",
      description: "Beyazın en iyi taş alış hamlesi nedir?",
      board: [
        { type: 'bishop', color: 'black', position: 'b8' },
        { type: 'rook', color: 'black', position: 'c8' },
        { type: 'king', color: 'black', position: 'g8' },
        { type: 'pawn', color: 'black', position: 'a7' },
        { type: 'pawn', color: 'black', position: 'f7' },
        { type: 'pawn', color: 'black', position: 'g7' },
        { type: 'pawn', color: 'black', position: 'h7' },
        { type: 'pawn', color: 'black', position: 'b6' },
        { type: 'pawn', color: 'black', position: 'e5' },
        { type: 'pawn', color: 'white', position: 'b4' },
        { type: 'queen', color: 'white', position: 'c4' },
        { type: 'bishop', color: 'black', position: 'e4' },
        { type: 'pawn', color: 'white', position: 'f4' },
        { type: 'queen', color: 'black', position: 'g4' },
        { type: 'pawn', color: 'white', position: 'a3' },
        { type: 'pawn', color: 'white', position: 'e3' },
        { type: 'knight', color: 'white', position: 'f3' },
        { type: 'bishop', color: 'white', position: 'b2' },
        { type: 'pawn', color: 'white', position: 'g2' },
        { type: 'pawn', color: 'white', position: 'h2' },
        { type: 'rook', color: 'white', position: 'd1' },
        { type: 'king', color: 'white', position: 'g1' }
      ],
      correctMove: 'c4-e4',
      explanation: "Beyaz vezir e4'teki savunmasız siyah fili alır. Bu fil hiçbir taş tarafından savunulmuyor."
    },
    {
      id: 9,
      title: "Alıştırma 9: Boştaki Taşı Bulmak",
      description: "Beyazın en iyi taş alış hamlesi nedir?",
      board: [
        { type: 'king', color: 'black', position: 'f8' },
        { type: 'knight', color: 'black', position: 'g8' },
        { type: 'pawn', color: 'black', position: 'a7' },
        { type: 'pawn', color: 'black', position: 'b6' },
        { type: 'pawn', color: 'black', position: 'c6' },
        { type: 'pawn', color: 'black', position: 'g6' },
        { type: 'rook', color: 'black', position: 'e5' },
        { type: 'pawn', color: 'white', position: 'g5' },
        { type: 'pawn', color: 'black', position: 'e4' },
        { type: 'rook', color: 'black', position: 'f4' },
        { type: 'knight', color: 'white', position: 'c3' },
        { type: 'pawn', color: 'white', position: 'd3' },
        { type: 'pawn', color: 'white', position: 'a2' },
        { type: 'pawn', color: 'white', position: 'b2' },
        { type: 'pawn', color: 'white', position: 'c2' },
        { type: 'king', color: 'white', position: 'c1' },
        { type: 'rook', color: 'white', position: 'f1' },
        { type: 'rook', color: 'white', position: 'h1' }
      ],
      correctMove: 'f1-f4',
      explanation: "Beyaz kale f4'teki savunmasız siyah kaleyi alır. Bu kale hiçbir taş tarafından savunulmuyor."
    },
    {
      id: 10,
      title: "Alıştırma 10: Boştaki Taşı Bulmak",
      description: "Beyazın en iyi taş alış hamlesi nedir?",
      board: [
        { type: 'rook', color: 'black', position: 'c8' },
        { type: 'rook', color: 'black', position: 'f8' },
        { type: 'king', color: 'black', position: 'h8' },
        { type: 'bishop', color: 'black', position: 'e7' },
        { type: 'pawn', color: 'black', position: 'f7' },
        { type: 'pawn', color: 'black', position: 'g7' },
        { type: 'pawn', color: 'black', position: 'h7' },
        { type: 'pawn', color: 'black', position: 'a6' },
        { type: 'bishop', color: 'white', position: 'a5' },
        { type: 'knight', color: 'black', position: 'd5' },
        { type: 'pawn', color: 'black', position: 'e5' },
        { type: 'knight', color: 'white', position: 'b3' },
        { type: 'pawn', color: 'white', position: 'b2' },
        { type: 'pawn', color: 'white', position: 'c2' },
        { type: 'rook', color: 'white', position: 'f2' },
        { type: 'pawn', color: 'white', position: 'g2' },
        { type: 'pawn', color: 'white', position: 'h2' },
        { type: 'rook', color: 'white', position: 'd1' },
        { type: 'king', color: 'white', position: 'g1' }
      ],
      correctMove: 'd1-d5',
      explanation: "Beyaz kale d5'teki savunmasız siyah atı alır. Bu at hiçbir taş tarafından savunulmuyor."
    },
    {
      id: 11,
      title: "Alıştırma 11: Boştaki Taşı Bulmak",
      description: "Beyazın en iyi taş alış hamlesi nedir?",
      board: [
        { type: 'rook', color: 'black', position: 'a8' },
        { type: 'rook', color: 'black', position: 'e8' },
        { type: 'king', color: 'black', position: 'g8' },
        { type: 'pawn', color: 'black', position: 'a7' },
        { type: 'pawn', color: 'black', position: 'b7' },
        { type: 'pawn', color: 'black', position: 'f7' },
        { type: 'bishop', color: 'black', position: 'g7' },
        { type: 'pawn', color: 'black', position: 'h7' },
        { type: 'pawn', color: 'black', position: 'g6' },
        { type: 'pawn', color: 'white', position: 'd5' },
        { type: 'knight', color: 'black', position: 'e5' },
        { type: 'rook', color: 'white', position: 'd4' },
        { type: 'bishop', color: 'black', position: 'e4' },
        { type: 'knight', color: 'white', position: 'b3' },
        { type: 'bishop', color: 'white', position: 'e3' },
        { type: 'pawn', color: 'white', position: 'g3' },
        { type: 'queen', color: 'black', position: 'h3' },
        { type: 'pawn', color: 'white', position: 'a2' },
        { type: 'pawn', color: 'white', position: 'b2' },
        { type: 'bishop', color: 'white', position: 'e2' },
        { type: 'pawn', color: 'white', position: 'f2' },
        { type: 'queen', color: 'white', position: 'e1' },
        { type: 'rook', color: 'white', position: 'f1' },
        { type: 'king', color: 'white', position: 'g1' }
      ],
      correctMove: 'd4-e4',
      explanation: "Beyaz kale e4'teki savunmasız siyah fili alır. Bu fil hiçbir taş tarafından savunulmuyor."
    },
    {
      id: 12,
      title: "Alıştırma 12: Boştaki Taşı Bulmak",
      description: "Beyazın en iyi taş alış hamlesi nedir?",
      board: [
        { type: 'rook', color: 'black', position: 'd8' },
        { type: 'king', color: 'black', position: 'g8' },
        { type: 'rook', color: 'black', position: 'd7' },
        { type: 'pawn', color: 'black', position: 'f7' },
        { type: 'pawn', color: 'black', position: 'h7' },
        { type: 'pawn', color: 'black', position: 'b6' },
        { type: 'pawn', color: 'white', position: 'd6' },
        { type: 'pawn', color: 'black', position: 'g6' },
        { type: 'pawn', color: 'black', position: 'a5' },
        { type: 'rook', color: 'white', position: 'c5' },
        { type: 'knight', color: 'black', position: 'g5' },
        { type: 'pawn', color: 'white', position: 'a3' },
        { type: 'bishop', color: 'white', position: 'f3' },
        { type: 'pawn', color: 'white', position: 'g3' },
        { type: 'pawn', color: 'white', position: 'b2' },
        { type: 'pawn', color: 'white', position: 'f2' },
        { type: 'king', color: 'white', position: 'g2' },
        { type: 'pawn', color: 'white', position: 'h2' },
        { type: 'rook', color: 'white', position: 'd1' }
      ],
      correctMove: 'c5-g5',
      explanation: "Beyaz kale g5'teki savunmasız siyah atı alır. Bu at hiçbir taş tarafından savunulmuyor."
    },
    {
      id: 13,
      title: "Alıştırma 13: Boştaki Taşı Bulmak",
      description: "Beyazın en iyi taş alış hamlesi nedir?",
      board: [
        { type: 'rook', color: 'black', position: 'f8' },
        { type: 'king', color: 'black', position: 'g8' },
        { type: 'pawn', color: 'black', position: 'f7' },
        { type: 'rook', color: 'black', position: 'c6' },
        { type: 'pawn', color: 'black', position: 'e6' },
        { type: 'queen', color: 'black', position: 'f6' },
        { type: 'pawn', color: 'black', position: 'g6' },
        { type: 'queen', color: 'white', position: 'h6' },
        { type: 'pawn', color: 'black', position: 'd5' },
        { type: 'pawn', color: 'white', position: 'd4' },
        { type: 'knight', color: 'white', position: 'c3' },
        { type: 'pawn', color: 'white', position: 'e3' },
        { type: 'bishop', color: 'black', position: 'g3' },
        { type: 'pawn', color: 'white', position: 'b2' },
        { type: 'king', color: 'white', position: 'g2' },
        { type: 'rook', color: 'white', position: 'f1' }
      ],
      correctMove: 'f1-f6',
      explanation: "Beyaz kale f6'daki savunmasız siyah veziri alır. Bu vezir hiçbir taş tarafından savunulmuyor."
    },
    {
      id: 14,
      title: "Alıştırma 14: Boştaki Taşı Bulmak",
      description: "Beyazın en iyi taş alış hamlesi nedir?",
      board: [
        { type: 'rook', color: 'black', position: 'f8' },
        { type: 'king', color: 'black', position: 'g8' },
        { type: 'pawn', color: 'black', position: 'a7' },
        { type: 'pawn', color: 'black', position: 'b7' },
        { type: 'bishop', color: 'black', position: 'd7' },
        { type: 'pawn', color: 'black', position: 'e7' },
        { type: 'pawn', color: 'black', position: 'h7' },
        { type: 'queen', color: 'black', position: 'a6' },
        { type: 'bishop', color: 'black', position: 'f6' },
        { type: 'pawn', color: 'black', position: 'g6' },
        { type: 'pawn', color: 'black', position: 'e5' },
        { type: 'rook', color: 'black', position: 'c4' },
        { type: 'knight', color: 'white', position: 'b3' },
        { type: 'bishop', color: 'white', position: 'e3' },
        { type: 'pawn', color: 'white', position: 'f3' },
        { type: 'pawn', color: 'white', position: 'a2' },
        { type: 'pawn', color: 'white', position: 'b2' },
        { type: 'pawn', color: 'white', position: 'c2' },
        { type: 'queen', color: 'white', position: 'e2' },
        { type: 'pawn', color: 'white', position: 'g2' },
        { type: 'king', color: 'white', position: 'c1' },
        { type: 'rook', color: 'white', position: 'd1' },
        { type: 'rook', color: 'white', position: 'h1' }
      ],
      correctMove: 'd1-d7',
      explanation: "Beyaz kale d7'deki savunmasız siyah fili alır. Bu fil hiçbir taş tarafından savunulmuyor."
    },
    {
      id: 15,
      title: "Alıştırma 15: Boştaki Taşı Bulmak",
      description: "Beyazın en iyi taş alış hamlesi nedir?",
      board: [
        { type: 'bishop', color: 'black', position: 'c8' },
        { type: 'rook', color: 'black', position: 'e8' },
        { type: 'king', color: 'black', position: 'g8' },
        { type: 'queen', color: 'black', position: 'c7' },
        { type: 'rook', color: 'black', position: 'd7' },
        { type: 'pawn', color: 'black', position: 'f7' },
        { type: 'pawn', color: 'black', position: 'h7' },
        { type: 'pawn', color: 'black', position: 'a6' },
        { type: 'pawn', color: 'black', position: 'b6' },
        { type: 'pawn', color: 'black', position: 'c6' },
        { type: 'rook', color: 'white', position: 'd6' },
        { type: 'bishop', color: 'black', position: 'f6' },
        { type: 'pawn', color: 'black', position: 'g6' },
        { type: 'pawn', color: 'black', position: 'e5' },
        { type: 'pawn', color: 'white', position: 'c4' },
        { type: 'pawn', color: 'white', position: 'b3' },
        { type: 'pawn', color: 'white', position: 'e3' },
        { type: 'knight', color: 'white', position: 'f3' },
        { type: 'pawn', color: 'white', position: 'g3' },
        { type: 'pawn', color: 'white', position: 'a2' },
        { type: 'bishop', color: 'white', position: 'b2' },
        { type: 'queen', color: 'white', position: 'c2' },
        { type: 'pawn', color: 'white', position: 'f2' },
        { type: 'pawn', color: 'white', position: 'h2' },
        { type: 'rook', color: 'white', position: 'd1' },
        { type: 'king', color: 'white', position: 'g1' }
      ],
      correctMove: 'd6-f6',
      explanation: "Beyaz kale f6'daki savunmasız siyah fili alır. Bu fil hiçbir taş tarafından savunulmuyor."
    },
    {
      id: 16,
      title: "Alıştırma 16: Boştaki Taşı Bulmak",
      description: "Beyazın en iyi taş alış hamlesi nedir?",
      board: [
        { type: 'knight', color: 'black', position: 'c8' },
        { type: 'bishop', color: 'black', position: 'b7' },
        { type: 'rook', color: 'black', position: 'f7' },
        { type: 'king', color: 'black', position: 'h7' },
        { type: 'pawn', color: 'black', position: 'e6' },
        { type: 'pawn', color: 'black', position: 'g6' },
        { type: 'pawn', color: 'black', position: 'h6' },
        { type: 'bishop', color: 'white', position: 'a5' },
        { type: 'pawn', color: 'black', position: 'b5' },
        { type: 'pawn', color: 'black', position: 'd5' },
        { type: 'pawn', color: 'white', position: 'e5' },
        { type: 'pawn', color: 'black', position: 'f5' },
        { type: 'pawn', color: 'white', position: 'b4' },
        { type: 'pawn', color: 'white', position: 'd4' },
        { type: 'pawn', color: 'white', position: 'h4' },
        { type: 'rook', color: 'white', position: 'c3' },
        { type: 'knight', color: 'white', position: 'd3' },
        { type: 'knight', color: 'white', position: 'f3' },
        { type: 'pawn', color: 'white', position: 'g3' },
        { type: 'pawn', color: 'white', position: 'a2' },
        { type: 'bishop', color: 'black', position: 'b2' },
        { type: 'pawn', color: 'white', position: 'f2' },
        { type: 'king', color: 'white', position: 'g1' }
      ],
      correctMove: 'd3-b2',
      explanation: "Beyaz at b2'deki savunmasız siyah fili alır. Bu fil hiçbir taş tarafından savunulmuyor."
    },
    {
      id: 17,
      title: "Alıştırma 17: Boştaki Taşı Bulmak",
      description: "Beyazın en iyi taş alış hamlesi nedir?",
      board: [
        { type: 'rook', color: 'black', position: 'a8' },
        { type: 'rook', color: 'black', position: 'f8' },
        { type: 'king', color: 'black', position: 'g8' },
        { type: 'bishop', color: 'black', position: 'b7' },
        { type: 'pawn', color: 'black', position: 'c7' },
        { type: 'pawn', color: 'black', position: 'f7' },
        { type: 'bishop', color: 'black', position: 'g7' },
        { type: 'pawn', color: 'black', position: 'a6' },
        { type: 'pawn', color: 'black', position: 'b6' },
        { type: 'pawn', color: 'black', position: 'e6' },
        { type: 'pawn', color: 'black', position: 'h6' },
        { type: 'pawn', color: 'white', position: 'e5' },
        { type: 'pawn', color: 'black', position: 'g5' },
        { type: 'pawn', color: 'white', position: 'a4' },
        { type: 'bishop', color: 'white', position: 'e4' },
        { type: 'pawn', color: 'white', position: 'b3' },
        { type: 'queen', color: 'black', position: 'c3' },
        { type: 'bishop', color: 'white', position: 'g3' },
        { type: 'pawn', color: 'white', position: 'h3' },
        { type: 'pawn', color: 'white', position: 'f2' },
        { type: 'pawn', color: 'white', position: 'g2' },
        { type: 'rook', color: 'white', position: 'd1' },
        { type: 'rook', color: 'white', position: 'e1' },
        { type: 'queen', color: 'white', position: 'f1' },
        { type: 'king', color: 'white', position: 'g1' }
      ],
      correctMove: 'e4-b7',
      explanation: "Beyaz fil b7'deki savunmasız siyah fili alır. Bu fil hiçbir taş tarafından savunulmuyor."
    },
    {
      id: 18,
      title: "Alıştırma 18: Boştaki Taşı Bulmak",
      description: "Beyazın en iyi taş alış hamlesi nedir?",
      board: [
        { type: 'rook', color: 'black', position: 'e8' },
        { type: 'king', color: 'black', position: 'g8' },
        { type: 'pawn', color: 'black', position: 'b7' },
        { type: 'pawn', color: 'black', position: 'c7' },
        { type: 'pawn', color: 'black', position: 'f7' },
        { type: 'pawn', color: 'black', position: 'g7' },
        { type: 'pawn', color: 'black', position: 'h7' },
        { type: 'pawn', color: 'black', position: 'a5' },
        { type: 'queen', color: 'black', position: 'b5' },
        { type: 'knight', color: 'white', position: 'c5' },
        { type: 'knight', color: 'black', position: 'd5' },
        { type: 'pawn', color: 'white', position: 'd4' },
        { type: 'bishop', color: 'black', position: 'g4' },
        { type: 'pawn', color: 'white', position: 'g3' },
        { type: 'queen', color: 'white', position: 'd2' },
        { type: 'pawn', color: 'white', position: 'e2' },
        { type: 'pawn', color: 'white', position: 'f2' },
        { type: 'bishop', color: 'white', position: 'g2' },
        { type: 'pawn', color: 'white', position: 'h2' },
        { type: 'rook', color: 'white', position: 'c1' },
        { type: 'king', color: 'white', position: 'g1' }
      ],
      correctMove: 'g2-d5',
      explanation: "Beyaz fil d5'teki savunmasız siyah atı alır. Bu at hiçbir taş tarafından savunulmuyor."
    },
    {
      id: 19,
      title: "Alıştırma 19: Boştaki Taşı Bulmak",
      description: "Beyazın en iyi taş alış hamlesi nedir?",
      board: [
        { type: 'rook', color: 'black', position: 'a8' },
        { type: 'bishop', color: 'black', position: 'c8' },
        { type: 'queen', color: 'black', position: 'd8' },
        { type: 'rook', color: 'black', position: 'f8' },
        { type: 'king', color: 'black', position: 'g8' },
        { type: 'pawn', color: 'black', position: 'a7' },
        { type: 'pawn', color: 'black', position: 'b7' },
        { type: 'pawn', color: 'black', position: 'e7' },
        { type: 'pawn', color: 'black', position: 'f7' },
        { type: 'bishop', color: 'black', position: 'g7' },
        { type: 'pawn', color: 'black', position: 'h7' },
        { type: 'pawn', color: 'black', position: 'd6' },
        { type: 'pawn', color: 'black', position: 'g6' },
        { type: 'queen', color: 'white', position: 'd5' },
        { type: 'pawn', color: 'white', position: 'e5' },
        { type: 'pawn', color: 'white', position: 'c4' },
        { type: 'knight', color: 'black', position: 'e4' },
        { type: 'knight', color: 'white', position: 'f3' },
        { type: 'pawn', color: 'white', position: 'a2' },
        { type: 'pawn', color: 'white', position: 'b2' },
        { type: 'pawn', color: 'white', position: 'f2' },
        { type: 'pawn', color: 'white', position: 'g2' },
        { type: 'pawn', color: 'white', position: 'h2' },
        { type: 'rook', color: 'white', position: 'a1' },
        { type: 'bishop', color: 'white', position: 'c1' },
        { type: 'king', color: 'white', position: 'e1' },
        { type: 'bishop', color: 'white', position: 'f1' },
        { type: 'rook', color: 'white', position: 'h1' }
      ],
      correctMove: 'd5-e4',
      explanation: "Beyaz vezir e4'teki savunmasız siyah atı alır. Bu at hiçbir taş tarafından savunulmuyor."
    },
    {
      id: 20,
      title: "Alıştırma 20: Boştaki Taşı Bulmak",
      description: "Beyazın en iyi taş alış hamlesi nedir?",
      board: [
        { type: 'bishop', color: 'black', position: 'c8' },
        { type: 'rook', color: 'black', position: 'f8' },
        { type: 'king', color: 'black', position: 'g8' },
        { type: 'pawn', color: 'black', position: 'b7' },
        { type: 'knight', color: 'black', position: 'e7' },
        { type: 'pawn', color: 'black', position: 'f7' },
        { type: 'pawn', color: 'black', position: 'g7' },
        { type: 'pawn', color: 'black', position: 'h7' },
        { type: 'rook', color: 'black', position: 'a6' },
        { type: 'bishop', color: 'white', position: 'd6' },
        { type: 'knight', color: 'black', position: 'a5' },
        { type: 'knight', color: 'white', position: 'b5' },
        { type: 'bishop', color: 'white', position: 'c4' },
        { type: 'pawn', color: 'white', position: 'e4' },
        { type: 'pawn', color: 'white', position: 'f4' },
        { type: 'pawn', color: 'white', position: 'g3' },
        { type: 'queen', color: 'black', position: 'h3' },
        { type: 'pawn', color: 'white', position: 'a2' },
        { type: 'pawn', color: 'white', position: 'h2' },
        { type: 'rook', color: 'white', position: 'c1' },
        { type: 'queen', color: 'white', position: 'd1' },
        { type: 'rook', color: 'white', position: 'f1' },
        { type: 'king', color: 'white', position: 'g1' }
      ],
      correctMove: 'd6-e7',
      explanation: "Beyaz fil e7'deki savunmasız siyah atı alır. Bu at hiçbir taş tarafından savunulmuyor."
    }
  ];

  useEffect(() => {
    setIsClient(true);
    if (user) {
      const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
      setCompletedPuzzles(userProgress.completedPuzzles || []);
      setScore(userProgress.score || 0);
    }
    // İlk puzzle'ın board'unu yükle
    setCurrentBoard(puzzles[currentPuzzle].board);
  }, [user, currentPuzzle]);

  const getPieceSymbol = (piece: ChessPiece) => {
    const symbols = {
      white: {
        king: '♔', queen: '♕', rook: '♖', bishop: '♗', knight: '♘', pawn: '♙'
      },
      black: {
        king: '♚', queen: '♛', rook: '♜', bishop: '♝', knight: '♞', pawn: '♟'
      }
    };
    return symbols[piece.color][piece.type];
  };

  const getSquareColor = (position: string) => {
    const file = position.charCodeAt(0) - 97; // a=0, b=1, etc.
    const rank = parseInt(position[1]) - 1;
    return (file + rank) % 2 === 0 ? '#b58863' : '#f0d9b5';
  };

  const handleSquareClick = (position: string) => {
    if (showResult) return;
    
    if (!selectedSquare) {
      // İlk tıklama - taş seçimi
      const piece = currentBoard.find(p => p.position === position);
      if (piece && piece.color === 'white') {
        setSelectedSquare(position);
        const moves = getPossibleMoves(piece, currentBoard);
        setPossibleMoves(moves);
      }
    } else {
      // İkinci tıklama - hamle yapma
      if (possibleMoves.includes(position)) {
        const move = `${selectedSquare}-${position}`;
        setUserMove(move);
        
        // Hamle yapınca taşların pozisyonunu güncelle
        const updatedBoard = currentBoard.map(piece => {
          if (piece.position === selectedSquare) {
            // Seçilen taşı yeni pozisyona taşı
            return { ...piece, position: position };
          } else if (piece.position === position && piece.color === 'black') {
            // Alınan taşı kaldır
            return null;
          }
          return piece;
        }).filter(piece => piece !== null) as ChessPiece[];
        
        // Board'u güncelle
        setCurrentBoard(updatedBoard);
        
        setShowResult(true);
        
        // Doğru hamle kontrolü
        const isCorrect = move === puzzles[currentPuzzle].correctMove;
        
        if (isCorrect) {
          setScore(prev => prev + 10);
          setCompletedPuzzles(prev => [...prev, puzzles[currentPuzzle].id]);
          
          // Progress'i kaydet
          if (user) {
            const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
            userProgress.completedPuzzles = [...completedPuzzles, puzzles[currentPuzzle].id];
            userProgress.score = score + 10;
            localStorage.setItem('userProgress', JSON.stringify(userProgress));
          }
        }
      }
      
      setSelectedSquare(null);
      setPossibleMoves([]);
    }
  };

  const nextPuzzle = () => {
    if (currentPuzzle < puzzles.length - 1) {
      setCurrentPuzzle(prev => prev + 1);
      setSelectedSquare(null);
      setPossibleMoves([]);
      setUserMove(null);
      setShowResult(false);
    }
  };

  const prevPuzzle = () => {
    if (currentPuzzle > 0) {
      setCurrentPuzzle(prev => prev - 1);
      setSelectedSquare(null);
      setPossibleMoves([]);
      setUserMove(null);
      setShowResult(false);
    }
  };

  const resetPuzzle = () => {
    setSelectedSquare(null);
    setPossibleMoves([]);
    setUserMove(null);
    setShowResult(false);
    setCurrentBoard(puzzles[currentPuzzle].board);
  };

  if (!isClient) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontSize: '1.2rem' }}>
        <div className="loading-spinner"></div>
        <p style={{ marginLeft: '10px' }}>Yükleniyor...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="hero">
        <h2>🔒 Giriş Gerekli</h2>
        <p>Bu antrenmanları kullanmak için lütfen giriş yapın.</p>
        <a href="/login" className="cta-button">Giriş Yap</a>
      </div>
    );
  }

  const puzzle = puzzles[currentPuzzle];
  const isCorrect = userMove && puzzle.correctMove.includes(userMove.split('-')[1]);

  return (
    <>
      <div className="hero">
        <h2>♟️ Konu 1: Boştaki Taşı Bulmak</h2>
        <p>Savunmasız taşları tespit etme ve alma becerilerini geliştirin</p>
      </div>

      <div className="training-container">
        <div className="training-header">
          <div className="puzzle-info">
            <h3>{puzzle.title}</h3>
            <p>{puzzle.description}</p>
          </div>
          <div className="score-info">
            <div className="score-item">
              <span className="score-label">Skor:</span>
              <span className="score-value">{score}</span>
            </div>
            <div className="score-item">
              <span className="score-label">Tamamlanan:</span>
              <span className="score-value">{completedPuzzles.length}/{puzzles.length}</span>
            </div>
          </div>
        </div>

        <div className="chess-board-container">
          <div className="chess-board">
            {Array.from({ length: 8 }, (_, rank) => 
              Array.from({ length: 8 }, (_, file) => {
                const position = String.fromCharCode(97 + file) + (8 - rank);
                const piece = currentBoard.find(p => p.position === position);
                const isSelected = selectedSquare === position;
                const isTarget = userMove && userMove.split('-')[1] === position;
                const isPossibleMove = possibleMoves.includes(position);
                const isCapture = isPossibleMove && piece && piece.color === 'black';
                
                return (
                  <div
                    key={position}
                    className={`chess-square ${isSelected ? 'selected' : ''} ${isTarget ? 'target' : ''} ${isPossibleMove ? 'possible-move' : ''}`}
                    style={{
                      backgroundColor: getSquareColor(position),
                      border: isSelected ? '4px solid #4CAF50' : isTarget ? '4px solid #FF5722' : '2px solid #333',
                      position: 'relative'
                    }}
                    onClick={() => handleSquareClick(position)}
                  >
                    {piece && (
                      <>
                        {/* Taş arka planı - renk göstergesi */}
                        <div 
                          className="piece-background"
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '30px',
                            height: '30px',
                            borderRadius: '60%',
                            backgroundColor: piece.color === 'white' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
                            zIndex: 1
                          }}
                        />
                        <span 
                          className="chess-piece" 
                          style={{ zIndex: 3 }}
                          title={`${piece.color === 'white' ? 'Beyaz' : 'Siyah'} ${piece.type === 'king' ? 'Şah' : piece.type === 'queen' ? 'Vezir' : piece.type === 'rook' ? 'Kale' : piece.type === 'bishop' ? 'Fil' : piece.type === 'knight' ? 'At' : 'Piyon'}`}
                        >
                        {getPieceSymbol(piece)}
                      </span>
                      </>
                    )}
                    
                    {/* Hareket alanı göstergesi */}
                    {isPossibleMove && !piece && (
                      <div className="move-indicator" style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(76, 175, 80, 0.6)',
                        border: '2px solid #4CAF50',
                        zIndex: 2
                      }} />
                    )}
                    
                    {/* Alma göstergesi */}
                    {isCapture && (
                      <div className="capture-indicator" style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 87, 34, 0.3)',
                        border: '3px solid #FF5722',
                        zIndex: 1
                      }} />
                    )}
                    
                    {showCoordinates && (
                      <span className="square-label" style={{ 
                        position: 'absolute', 
                        bottom: '2px', 
                        right: '2px', 
                        fontSize: '0.8rem', 
                        fontWeight: 'bold', 
                        color: '#666',
                        zIndex: 4
                      }}>
                        {position}
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="training-controls">
          <button onClick={prevPuzzle} disabled={currentPuzzle === 0} className="control-btn">
            ← Önceki
          </button>
          <button onClick={resetPuzzle} className="control-btn">
            🔄 Yeniden Başla
          </button>
          <button onClick={nextPuzzle} disabled={currentPuzzle === puzzles.length - 1} className="control-btn">
            Sonraki →
          </button>
          <button 
            onClick={() => setShowCoordinates(!showCoordinates)} 
            className="control-btn"
            style={{ backgroundColor: showCoordinates ? '#4CAF50' : '#666' }}
          >
            {showCoordinates ? '📍 Koordinatları Gizle' : '📍 Koordinatları Göster'}
          </button>
        </div>

        {showResult && (
          <div className={`result-message ${isCorrect ? 'success' : 'error'}`}>
            <h4>{isCorrect ? '✅ Doğru!' : '❌ Yanlış!'}</h4>
            <p><strong>Doğru Hamle:</strong> {puzzle.correctMove}</p>
            <p><strong>Açıklama:</strong> {puzzle.explanation}</p>
            {isCorrect && <p className="score-earned">+10 puan kazandınız!</p>}
          </div>
        )}

        <div className="training-instructions">
          <h4>🎮 Nasıl Oynanır:</h4>
          <ul>
            <li><strong>1. Adım:</strong> Beyaz taşlardan birini seçin (yeşil kenarlık)</li>
            <li><strong>2. Adım:</strong> Taşın gidebileceği yerler yeşil noktalarla gösterilir</li>
            <li><strong>3. Adım:</strong> Alma yapabileceği yerler kırmızı çerçeveyle gösterilir</li>
            <li><strong>4. Adım:</strong> Doğru hamleyi bulmaya çalışın</li>
            <li><strong>5. Adım:</strong> Her doğru cevap 10 puan kazandırır! 🎉</li>
          </ul>
          <div className="legend">
            <h5>🏷️ Renk Anlamları:</h5>
            <div className="legend-items">
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#4CAF50' }}></div>
                <span>Seçili taş</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: 'rgba(76, 175, 80, 0.6)' }}></div>
                <span>Gidilebilir yer</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: 'rgba(255, 87, 34, 0.3)' }}></div>
                <span>Alınabilir taş</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="book-actions">
        <a href="/kitaplar/satrancta-tas-alisverisi" className="cta secondary">← Kitaba Dön</a>
        <a href="/oyunlar/satrancta-tas-alisverisi-konu2" className="cta primary">Konu 2 →</a>
      </div>

      <style jsx>{`
        .training-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .training-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .puzzle-info h3 {
          margin: 0 0 10px 0;
          color: #1f2937;
        }

        .puzzle-info p {
          margin: 0;
          color: #6b7280;
        }

        .score-info {
          display: flex;
          gap: 20px;
        }

        .score-item {
          text-align: center;
        }

        .score-label {
          display: block;
          font-size: 0.9rem;
          color: #6b7280;
          margin-bottom: 5px;
        }

        .score-value {
          display: block;
          font-size: 1.5rem;
          font-weight: bold;
          color: #1f2937;
        }

        .chess-board-container {
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
        }

        .chess-board {
          display: grid;
          grid-template-columns: repeat(8, 70px);
          grid-template-rows: repeat(8, 70px);
          border: 4px solid #8B4513;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
          background: #8B4513;
          max-width: 100%;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .chess-board-container {
            padding: 0 15px;
            margin-bottom: 20px;
            display: flex;
            justify-content: center;
            width: 100%;
            overflow-x: hidden;
          }
          
          .chess-board {
            grid-template-columns: repeat(8, 1fr);
            grid-template-rows: repeat(8, 1fr);
            width: min(calc(100vw - 30px), 400px);
            height: min(calc(100vw - 30px), 400px);
            aspect-ratio: 1;
            max-width: 100%;
          }
          
          .chess-square {
            font-size: 1.2rem;
            min-height: 0;
            min-width: 0;
          }
          
          .chess-piece {
            font-size: 1.5rem;
          }
          
          .square-label {
            font-size: 0.6rem;
            bottom: 1px;
            right: 1px;
            padding: 1px 2px;
          }
          
          .training-controls {
            flex-direction: column;
            gap: 10px;
            margin-bottom: 20px;
            padding: 0 15px;
          }
          
          .control-btn {
            padding: 10px 20px;
            font-size: 0.9rem;
            width: 100%;
          }
          
          .result-message {
            padding: 15px;
            margin-bottom: 20px;
          }
          
          .result-message h4 {
            font-size: 1.1rem;
          }
          
          .training-instructions {
            padding: 15px;
          }
          
          .legend {
            padding: 12px;
          }
          
          .book-actions {
            flex-direction: column;
            gap: 15px;
            margin-top: 30px;
          }
        }

        @media (max-width: 480px) {
          .chess-board-container {
            padding: 0 10px;
          }
          
          .chess-board {
            width: min(calc(100vw - 20px), 320px);
            height: min(calc(100vw - 20px), 320px);
            border-width: 2px;
          }
          
          .chess-square {
            font-size: 1rem;
          }
          
          .chess-piece {
            font-size: 1.2rem;
          }
          
          .square-label {
            font-size: 0.5rem;
            bottom: 0px;
            right: 0px;
            padding: 1px;
          }
          
          .control-btn {
            padding: 8px 16px;
            font-size: 0.8rem;
          }
          
          .result-message {
            padding: 12px;
          }
          
          .result-message h4 {
            font-size: 1rem;
          }
          
          .training-instructions {
            padding: 12px;
          }
          
          .legend {
            padding: 10px;
          }
        }

        @media (max-width: 375px) {
          .chess-board-container {
            padding: 0 8px;
          }
          
          .chess-board {
            width: min(calc(100vw - 16px), 300px);
            height: min(calc(100vw - 16px), 300px);
            border-width: 2px;
          }
          
          .chess-square {
            font-size: 0.9rem;
          }
          
          .chess-piece {
            font-size: 1rem;
          }
          
          .square-label {
            font-size: 0.4rem;
          }
        }

        @media (max-width: 360px) {
          .chess-board-container {
            padding: 0 5px;
          }
          
          .chess-board {
            width: calc(100vw - 10px);
            height: calc(100vw - 10px);
            border-width: 1px;
          }
          
          .chess-square {
            font-size: 0.8rem;
          }
          
          .chess-piece {
            font-size: 0.9rem;
          }
          
          .square-label {
            font-size: 0.35rem;
          }
        }

        .chess-square {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .chess-square:hover {
          transform: scale(1.05);
          box-shadow: inset 0 0 0 2px #FFD700;
        }

        .chess-square.selected {
          box-shadow: inset 0 0 0 4px #4CAF50;
          transform: scale(1.1);
        }

        .chess-square.target {
          box-shadow: inset 0 0 0 4px #FF5722;
        }

        .chess-square.possible-move {
          background: rgba(76, 175, 80, 0.2) !important;
        }

        .chess-piece {
          position: absolute;
          z-index: 3;
          filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
          transition: all 0.2s ease;
          font-size: 2.5rem;
        }

        .chess-piece:hover {
          transform: scale(1.1);
        }

        .square-label {
          position: absolute;
          bottom: 3px;
          right: 3px;
          font-size: 0.9rem;
          font-weight: bold;
          color: #333;
          z-index: 4;
          background: rgba(255, 255, 255, 0.8);
          padding: 2px 4px;
          border-radius: 3px;
        }

        .training-controls {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-bottom: 30px;
        }

        .control-btn {
          padding: 12px 24px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.2s ease;
        }

        .control-btn:hover:not(:disabled) {
          background: #2563eb;
        }

        .control-btn:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }

        .result-message {
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 30px;
          text-align: center;
        }

        .result-message.success {
          background: #d1fae5;
          border: 2px solid #10b981;
          color: #065f46;
        }

        .result-message.error {
          background: #fee2e2;
          border: 2px solid #ef4444;
          color: #991b1b;
        }

        .result-message h4 {
          margin: 0 0 15px 0;
          font-size: 1.2rem;
        }

        .result-message p {
          margin: 8px 0;
        }

        .score-earned {
          font-weight: bold;
          color: #059669;
        }

        .training-instructions {
          background: #f8fafc;
          padding: 20px;
          border-radius: 12px;
          border-left: 4px solid #3b82f6;
        }

        .training-instructions h4 {
          margin: 0 0 15px 0;
          color: #1f2937;
        }

        .training-instructions ul {
          margin: 0;
          padding-left: 20px;
        }

        .training-instructions li {
          margin: 8px 0;
          color: #4b5563;
        }

        .legend {
          margin-top: 20px;
          padding: 15px;
          background: #f0f9ff;
          border-radius: 8px;
          border-left: 4px solid #0ea5e9;
        }

        .legend h5 {
          margin: 0 0 15px 0;
          color: #0c4a6e;
        }

        .legend-items {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .legend-color {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid #333;
        }

        .book-actions {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 40px;
        }
      `}</style>
    </>
  );
}
