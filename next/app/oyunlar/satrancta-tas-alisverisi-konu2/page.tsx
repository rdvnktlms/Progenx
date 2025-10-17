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

export default function SatranctaTasAlisverisiKonu2Page() {
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
  const [moveSequence, setMoveSequence] = useState<string[]>([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);
  const [isCorrectMove, setIsCorrectMove] = useState(false);
  const [showCoordinates, setShowCoordinates] = useState(true);

  const puzzles: Puzzle[] = [
    {
      id: 21,
      title: "Alıştırma 21: Avantajlı Taş Değişimi",
      description: "Beyazın en iyi taş değişimi hamlesi nedir? Puan hesabı yapın.",
      board: [
        { type: 'rook', color: 'white', position: 'b7' },
        { type: 'pawn', color: 'black', position: 'f7' },
        { type: 'king', color: 'black', position: 'g7' },
        { type: 'pawn', color: 'black', position: 'd6' },
        { type: 'pawn', color: 'black', position: 'e6' },
        { type: 'knight', color: 'black', position: 'f6' },
        { type: 'pawn', color: 'black', position: 'b5' },
        { type: 'pawn', color: 'white', position: 'e5' },
        { type: 'pawn', color: 'black', position: 'h5' },
        { type: 'bishop', color: 'white', position: 'f3' },
        { type: 'rook', color: 'black', position: 'a2' },
        { type: 'pawn', color: 'white', position: 'b2' },
        { type: 'pawn', color: 'white', position: 'g2' },
        { type: 'pawn', color: 'white', position: 'h2' },
        { type: 'king', color: 'white', position: 'g1' }
      ],
      correctMove: 'e5-f6, g7-f6',
      explanation: "1. e5xf6+: Beyaz piyon (1 puan) siyah atı (3 puan) alır ve şah çeker. 2. Kxf6: Siyah şah g7'den f6'daki piyonu alır. Sonuç: Beyaz 2 puanlık avantajlı değişim yapar (3-1=2 puan kazanç)."
    },
    {
      id: 22,
      title: "Alıştırma 22: Avantajlı Taş Değişimi",
      description: "Beyazın en iyi taş değişimi hamlesi nedir? Puan hesabı yapın.",
      board: [
        { type: 'king', color: 'black', position: 'c8' },
        { type: 'rook', color: 'black', position: 'd8' },
        { type: 'rook', color: 'black', position: 'h8' },
        { type: 'pawn', color: 'black', position: 'a7' },
        { type: 'pawn', color: 'black', position: 'b7' },
        { type: 'bishop', color: 'black', position: 'd7' },
        { type: 'pawn', color: 'black', position: 'f7' },
        { type: 'pawn', color: 'black', position: 'g7' },
        { type: 'pawn', color: 'black', position: 'h7' },
        { type: 'knight', color: 'black', position: 'c6' },
        { type: 'bishop', color: 'white', position: 'b5' },
        { type: 'pawn', color: 'white', position: 'd5' },
        { type: 'knight', color: 'white', position: 'f3' },
        { type: 'pawn', color: 'white', position: 'a2' },
        { type: 'king', color: 'white', position: 'd2' },
        { type: 'pawn', color: 'white', position: 'f2' },
        { type: 'pawn', color: 'white', position: 'g2' },
        { type: 'pawn', color: 'white', position: 'h2' },
        { type: 'rook', color: 'white', position: 'b1' },
        { type: 'rook', color: 'white', position: 'h1' }
      ],
      correctMove: 'd5-c6',
      explanation: "1. dxc6: Beyaz piyon (1 puan) c6'daki siyah atı (3 puan) alır. Sonuç: Beyaz 2 puanlık avantajlı değişim yapar (3-1=2 puan kazanç)."
    },
    {
      id: 23,
      title: "Alıştırma 23: Avantajlı Taş Değişimi",
      description: "Beyazın en iyi taş değişimi hamlesi nedir? Puan hesabı yapın.",
      board: [
        { type: 'rook', color: 'black', position: 'a8' },
        { type: 'queen', color: 'black', position: 'c8' },
        { type: 'king', color: 'black', position: 'g8' },
        { type: 'pawn', color: 'black', position: 'c7' },
        { type: 'pawn', color: 'black', position: 'f7' },
        { type: 'pawn', color: 'black', position: 'g7' },
        { type: 'pawn', color: 'black', position: 'a6' },
        { type: 'knight', color: 'black', position: 'c6' },
        { type: 'rook', color: 'black', position: 'd6' },
        { type: 'pawn', color: 'black', position: 'h6' },
        { type: 'pawn', color: 'white', position: 'b5' },
        { type: 'knight', color: 'white', position: 'c5' },
        { type: 'pawn', color: 'black', position: 'e5' },
        { type: 'pawn', color: 'white', position: 'b4' },
        { type: 'knight', color: 'black', position: 'f4' },
        { type: 'pawn', color: 'white', position: 'c3' },
        { type: 'pawn', color: 'white', position: 'd3' },
        { type: 'knight', color: 'white', position: 'f3' },
        { type: 'pawn', color: 'white', position: 'h3' },
        { type: 'queen', color: 'white', position: 'a2' },
        { type: 'pawn', color: 'white', position: 'f2' },
        { type: 'pawn', color: 'white', position: 'g2' },
        { type: 'rook', color: 'white', position: 'a1' },
        { type: 'rook', color: 'white', position: 'e1' },
        { type: 'king', color: 'white', position: 'g1' }
      ],
      correctMove: 'b5-c6',
      explanation: "1. bxc6: Beyaz piyon (1 puan) c6'daki siyah atı (3 puan) alır. Sonuç: Beyaz 2 puanlık avantajlı değişim yapar (3-1=2 puan kazanç)."
    },
    {
      id: 24,
      title: "Alıştırma 24: Avantajlı Taş Değişimi",
      description: "Beyazın en iyi taş değişimi hamlesi nedir? Puan hesabı yapın.",
      board: [
        { type: 'rook', color: 'black', position: 'a8' },
        { type: 'bishop', color: 'black', position: 'f8' },
        { type: 'pawn', color: 'black', position: 'a7' },
        { type: 'king', color: 'black', position: 'd7' },
        { type: 'pawn', color: 'black', position: 'e7' },
        { type: 'pawn', color: 'black', position: 'g7' },
        { type: 'pawn', color: 'black', position: 'c6' },
        { type: 'pawn', color: 'black', position: 'e6' },
        { type: 'knight', color: 'white', position: 'g6' },
        { type: 'pawn', color: 'black', position: 'b5' },
        { type: 'rook', color: 'black', position: 'f5' },
        { type: 'pawn', color: 'white', position: 'a4' },
        { type: 'pawn', color: 'black', position: 'c4' },
        { type: 'pawn', color: 'white', position: 'd4' },
        { type: 'pawn', color: 'white', position: 'g4' },
        { type: 'pawn', color: 'white', position: 'c3' },
        { type: 'bishop', color: 'white', position: 'e2' },
        { type: 'pawn', color: 'white', position: 'h2' },
        { type: 'rook', color: 'white', position: 'a1' },
        { type: 'bishop', color: 'white', position: 'c1' },
        { type: 'king', color: 'white', position: 'e1' }
      ],
      correctMove: 'g4-f5, e6-f5',
      explanation: "1. gxf5: Beyaz piyon (1 puan) f5'teki siyah kaleyi (5 puan) alır. 2. exf5: Siyah piyon e6'dan f5'teki beyaz piyonu alır. Sonuç: Beyaz 4 puanlık avantajlı değişim yapar (5-1=4 puan kazanç)."
    },
    {
      id: 25,
      title: "Alıştırma 25: Avantajlı Taş Değişimi",
      description: "Beyazın en iyi taş değişimi hamlesi nedir? Puan hesabı yapın.",
      board: [
        { type: 'king', color: 'black', position: 'c8' },
        { type: 'rook', color: 'black', position: 'g8' },
        { type: 'bishop', color: 'black', position: 'e7' },
        { type: 'pawn', color: 'black', position: 'h7' },
        { type: 'pawn', color: 'black', position: 'e6' },
        { type: 'pawn', color: 'black', position: 'f6' },
        { type: 'rook', color: 'black', position: 'a5' },
        { type: 'queen', color: 'black', position: 'b5' },
        { type: 'rook', color: 'white', position: 'd5' },
        { type: 'knight', color: 'black', position: 'e5' },
        { type: 'bishop', color: 'white', position: 'f4' },
        { type: 'pawn', color: 'white', position: 'b3' },
        { type: 'pawn', color: 'white', position: 'b2' },
        { type: 'queen', color: 'white', position: 'e2' },
        { type: 'pawn', color: 'white', position: 'f2' },
        { type: 'pawn', color: 'white', position: 'g2' },
        { type: 'pawn', color: 'white', position: 'h2' },
        { type: 'king', color: 'white', position: 'b1' }
      ],
      correctMove: 'd5-b5, b5-b5',
      explanation: "1. Rxb5: Beyaz kale (5 puan) b5'teki siyah veziri (9 puan) alır. 2. Qxb5: Siyah vezir b5'teki beyaz kaleyi alır. Sonuç: Beyaz 4 puanlık avantajlı değişim yapar (9-5=4 puan kazanç)."
    },
    {
      id: 26,
      title: "Alıştırma 26: Avantajlı Taş Değişimi",
      description: "Beyazın en iyi taş değişimi hamlesi nedir? Puan hesabı yapın.",
      board: [
        { type: 'rook', color: 'black', position: 'd8' },
        { type: 'knight', color: 'black', position: 'e8' },
        { type: 'rook', color: 'black', position: 'f8' },
        { type: 'king', color: 'black', position: 'g8' },
        { type: 'pawn', color: 'black', position: 'a7' },
        { type: 'pawn', color: 'black', position: 'f7' },
        { type: 'pawn', color: 'black', position: 'h7' },
        { type: 'pawn', color: 'black', position: 'b6' },
        { type: 'pawn', color: 'black', position: 'c6' },
        { type: 'bishop', color: 'black', position: 'e6' },
        { type: 'queen', color: 'black', position: 'f6' },
        { type: 'pawn', color: 'black', position: 'g6' },
        { type: 'queen', color: 'white', position: 'h6' },
        { type: 'pawn', color: 'black', position: 'c4' },
        { type: 'pawn', color: 'white', position: 'd3' },
        { type: 'pawn', color: 'white', position: 'h3' },
        { type: 'pawn', color: 'white', position: 'b2' },
        { type: 'pawn', color: 'white', position: 'c2' },
        { type: 'pawn', color: 'white', position: 'g2' },
        { type: 'knight', color: 'white', position: 'h2' },
        { type: 'rook', color: 'white', position: 'e1' },
        { type: 'rook', color: 'white', position: 'f1' },
        { type: 'king', color: 'white', position: 'g1' }
      ],
      correctMove: 'f1-f6, e8-f6',
      explanation: "1. Rxf6: Beyaz kale (5 puan) f6'daki siyah veziri (9 puan) alır. 2. Nxf6: Siyah at e8'den f6'daki beyaz kaleyi alır. Sonuç: Beyaz 4 puanlık avantajlı değişim yapar (9-5=4 puan kazanç)."
    },
    {
      id: 27,
      title: "Alıştırma 27: Avantajlı Taş Değişimi",
      description: "Beyazın en iyi taş değişimi hamlesi nedir? Puan hesabı yapın.",
      board: [
        { type: 'queen', color: 'black', position: 'd8' },
        { type: 'rook', color: 'black', position: 'f8' },
        { type: 'king', color: 'black', position: 'g8' },
        { type: 'bishop', color: 'black', position: 'e7' },
        { type: 'pawn', color: 'black', position: 'f7' },
        { type: 'knight', color: 'black', position: 'g7' },
        { type: 'pawn', color: 'black', position: 'a6' },
        { type: 'bishop', color: 'black', position: 'e6' },
        { type: 'pawn', color: 'black', position: 'g6' },
        { type: 'pawn', color: 'black', position: 'b5' },
        { type: 'bishop', color: 'white', position: 'c5' },
        { type: 'pawn', color: 'black', position: 'h5' },
        { type: 'pawn', color: 'white', position: 'b4' },
        { type: 'pawn', color: 'white', position: 'g3' },
        { type: 'pawn', color: 'white', position: 'h3' },
        { type: 'pawn', color: 'white', position: 'a2' },
        { type: 'queen', color: 'white', position: 'e2' },
        { type: 'pawn', color: 'white', position: 'f2' },
        { type: 'bishop', color: 'white', position: 'g2' },
        { type: 'rook', color: 'white', position: 'd1' },
        { type: 'king', color: 'white', position: 'g1' }
      ],
      correctMove: 'd1-d8, e7-d8',
      explanation: "1. Rxd8: Beyaz kale (5 puan) d8'deki siyah veziri (9 puan) alır. 2. Bxd8: Siyah fil e7'den d8'deki beyaz kaleyi alır. Sonuç: Beyaz 4 puanlık avantajlı değişim yapar (9-5=4 puan kazanç)."
    },
    {
      id: 28,
      title: "Alıştırma 28: Avantajlı Taş Değişimi",
      description: "Beyazın en iyi taş değişimi hamlesi nedir? Puan hesabı yapın.",
      board: [
        { type: 'rook', color: 'black', position: 'a8' },
        { type: 'king', color: 'black', position: 'g8' },
        { type: 'pawn', color: 'black', position: 'a7' },
        { type: 'bishop', color: 'black', position: 'b7' },
        { type: 'pawn', color: 'black', position: 'e7' },
        { type: 'rook', color: 'black', position: 'f7' },
        { type: 'bishop', color: 'black', position: 'g7' },
        { type: 'pawn', color: 'black', position: 'b6' },
        { type: 'pawn', color: 'black', position: 'g6' },
        { type: 'queen', color: 'black', position: 'c5' },
        { type: 'pawn', color: 'white', position: 'e5' },
        { type: 'knight', color: 'white', position: 'g5' },
        { type: 'knight', color: 'black', position: 'd4' },
        { type: 'rook', color: 'white', position: 'h3' },
        { type: 'pawn', color: 'white', position: 'a2' },
        { type: 'bishop', color: 'white', position: 'd2' },
        { type: 'pawn', color: 'white', position: 'f2' },
        { type: 'pawn', color: 'white', position: 'g2' },
        { type: 'rook', color: 'white', position: 'c1' },
        { type: 'queen', color: 'white', position: 'd1' },
        { type: 'king', color: 'white', position: 'e1' }
      ],
      correctMove: 'c1-c5, b7-e5',
      explanation: "1. Rxc5: Beyaz kale (5 puan) c5'teki siyah veziri (9 puan) alır. 2. Bxe5: Siyah fil b7'den e5'teki beyaz kaleyi alır. Sonuç: Beyaz 4 puanlık avantajlı değişim yapar (9-5=4 puan kazanç)."
    },
    {
      id: 29,
      title: "Alıştırma 29: Avantajlı Taş Değişimi",
      description: "Beyazın en iyi taş değişimi hamlesi nedir? Puan hesabı yapın.",
      board: [
        { type: 'rook', color: 'black', position: 'b8' },
        { type: 'bishop', color: 'black', position: 'c8' },
        { type: 'knight', color: 'black', position: 'd7' },
        { type: 'king', color: 'black', position: 'g7' },
        { type: 'knight', color: 'black', position: 'h7' },
        { type: 'pawn', color: 'black', position: 'a6' },
        { type: 'queen', color: 'black', position: 'f6' },
        { type: 'knight', color: 'white', position: 'h6' },
        { type: 'pawn', color: 'black', position: 'c5' },
        { type: 'pawn', color: 'white', position: 'd5' },
        { type: 'rook', color: 'black', position: 'e5' },
        { type: 'pawn', color: 'white', position: 'a4' },
        { type: 'pawn', color: 'black', position: 'b4' },
        { type: 'pawn', color: 'white', position: 'c4' },
        { type: 'pawn', color: 'white', position: 'b3' },
        { type: 'pawn', color: 'white', position: 'h3' },
        { type: 'queen', color: 'white', position: 'd2' },
        { type: 'pawn', color: 'white', position: 'g2' },
        { type: 'rook', color: 'white', position: 'e1' },
        { type: 'rook', color: 'white', position: 'f1' },
        { type: 'king', color: 'white', position: 'h1' }
      ],
      correctMove: 'f1-f6, h7-f6',
      explanation: "1. Rxf6: Beyaz kale (5 puan) f6'daki siyah veziri (9 puan) alır. 2. Nxf6: Siyah at h7'den f6'daki beyaz kaleyi alır. Sonuç: Beyaz 4 puanlık avantajlı değişim yapar (9-5=4 puan kazanç)."
    },
    {
      id: 30,
      title: "Alıştırma 30: Avantajlı Taş Değişimi",
      description: "Beyazın en iyi taş değişimi hamlesi nedir? Puan hesabı yapın.",
      board: [
        { type: 'rook', color: 'black', position: 'a8' },
        { type: 'bishop', color: 'black', position: 'c8' },
        { type: 'rook', color: 'black', position: 'e8' },
        { type: 'king', color: 'black', position: 'g8' },
        { type: 'pawn', color: 'black', position: 'a7' },
        { type: 'pawn', color: 'black', position: 'b7' },
        { type: 'pawn', color: 'black', position: 'f7' },
        { type: 'pawn', color: 'black', position: 'g7' },
        { type: 'knight', color: 'black', position: 'f6' },
        { type: 'pawn', color: 'black', position: 'h6' },
        { type: 'pawn', color: 'white', position: 'c5' },
        { type: 'pawn', color: 'white', position: 'f5' },
        { type: 'pawn', color: 'white', position: 'a4' },
        { type: 'queen', color: 'black', position: 'e4' },
        { type: 'pawn', color: 'white', position: 'c3' },
        { type: 'queen', color: 'white', position: 'f3' },
        { type: 'pawn', color: 'white', position: 'c2' },
        { type: 'bishop', color: 'white', position: 'f2' },
        { type: 'pawn', color: 'white', position: 'g2' },
        { type: 'pawn', color: 'white', position: 'h2' },
        { type: 'rook', color: 'white', position: 'e1' },
        { type: 'rook', color: 'white', position: 'f1' },
        { type: 'king', color: 'white', position: 'g1' }
      ],
      correctMove: 'e1-e4, e8-e4',
      explanation: "1. Rxe4: Beyaz kale (5 puan) e4'teki siyah veziri (9 puan) alır. 2. Rxe4: Siyah kale e8'den e4'teki beyaz kaleyi alır. Sonuç: Beyaz 4 puanlık avantajlı değişim yapar (9-5=4 puan kazanç)."
    },
    {
      id: 31,
      title: "Alıştırma 31: Avantajlı Taş Değişimi",
      description: "Beyazın en iyi taş değişimi hamlesi nedir? Puan hesabı yapın.",
      board: [
        { type: 'rook', color: 'black', position: 'a8' },
        { type: 'bishop', color: 'black', position: 'c8' },
        { type: 'rook', color: 'black', position: 'f8' },
        { type: 'king', color: 'black', position: 'g8' },
        { type: 'bishop', color: 'white', position: 'b7' },
        { type: 'pawn', color: 'black', position: 'f7' },
        { type: 'pawn', color: 'black', position: 'g7' },
        { type: 'pawn', color: 'black', position: 'a6' },
        { type: 'bishop', color: 'black', position: 'd6' },
        { type: 'pawn', color: 'black', position: 'h6' },
        { type: 'pawn', color: 'black', position: 'c5' },
        { type: 'queen', color: 'black', position: 'e5' },
        { type: 'queen', color: 'white', position: 'b3' },
        { type: 'pawn', color: 'white', position: 'a2' },
        { type: 'pawn', color: 'white', position: 'b2' },
        { type: 'pawn', color: 'white', position: 'c2' },
        { type: 'pawn', color: 'white', position: 'f2' },
        { type: 'pawn', color: 'white', position: 'g2' },
        { type: 'pawn', color: 'white', position: 'h2' },
        { type: 'rook', color: 'white', position: 'a1' },
        { type: 'rook', color: 'white', position: 'e1' },
        { type: 'king', color: 'white', position: 'g1' }
      ],
      correctMove: 'e1-e5',
      explanation: "1. Rxe5: Beyaz kale (5 puan) e5'teki siyah veziri (9 puan) alır. Sonuç: Beyaz 4 puanlık avantajlı değişim yapar (9-5=4 puan kazanç)."
    },
    {
      id: 32,
      title: "Alıştırma 32: Avantajlı Taş Değişimi",
      description: "Beyazın en iyi taş değişimi hamlesi nedir? Puan hesabı yapın.",
      board: [
        { type: 'rook', color: 'black', position: 'a8' },
        { type: 'pawn', color: 'black', position: 'd7' },
        { type: 'knight', color: 'black', position: 'e7' },
        { type: 'king', color: 'black', position: 'f7' },
        { type: 'pawn', color: 'black', position: 'a6' },
        { type: 'pawn', color: 'black', position: 'b6' },
        { type: 'bishop', color: 'white', position: 'd6' },
        { type: 'pawn', color: 'black', position: 'e6' },
        { type: 'queen', color: 'black', position: 'g6' },
        { type: 'queen', color: 'white', position: 'h6' },
        { type: 'pawn', color: 'black', position: 'f5' },
        { type: 'pawn', color: 'white', position: 'b4' },
        { type: 'pawn', color: 'white', position: 'a3' },
        { type: 'rook', color: 'white', position: 'g3' },
        { type: 'pawn', color: 'white', position: 'h3' },
        { type: 'king', color: 'white', position: 'f1' },
        { type: 'bishop', color: 'black', position: 'h1' }
      ],
      correctMove: 'g3-g6, e7-g6',
      explanation: "1. Rxg6: Beyaz kale (5 puan) g6'daki siyah veziri (9 puan) alır. 2. Nxg6: Siyah at e7'den g6'daki beyaz kaleyi alır. Sonuç: Beyaz 4 puanlık avantajlı değişim yapar (9-5=4 puan kazanç)."
    },
    {
      id: 33,
      title: "Alıştırma 33: Avantajlı Taş Değişimi",
      description: "Beyazın en iyi taş değişimi hamlesi nedir? Puan hesabı yapın.",
      board: [
        { type: 'rook', color: 'black', position: 'a8' },
        { type: 'rook', color: 'black', position: 'f8' },
        { type: 'king', color: 'black', position: 'g8' },
        { type: 'bishop', color: 'black', position: 'b7' },
        { type: 'pawn', color: 'black', position: 'c7' },
        { type: 'pawn', color: 'black', position: 'f7' },
        { type: 'bishop', color: 'black', position: 'g7' },
        { type: 'pawn', color: 'black', position: 'h7' },
        { type: 'pawn', color: 'black', position: 'a6' },
        { type: 'knight', color: 'white', position: 'c6' },
        { type: 'queen', color: 'black', position: 'd6' },
        { type: 'pawn', color: 'black', position: 'g6' },
        { type: 'knight', color: 'black', position: 'h6' },
        { type: 'pawn', color: 'black', position: 'b5' },
        { type: 'pawn', color: 'black', position: 'd5' },
        { type: 'knight', color: 'black', position: 'b4' },
        { type: 'knight', color: 'white', position: 'e4' },
        { type: 'pawn', color: 'white', position: 'f4' },
        { type: 'pawn', color: 'white', position: 'g4' },
        { type: 'bishop', color: 'white', position: 'e3' },
        { type: 'pawn', color: 'white', position: 'h3' },
        { type: 'pawn', color: 'white', position: 'a2' },
        { type: 'pawn', color: 'white', position: 'b2' },
        { type: 'pawn', color: 'white', position: 'c2' },
        { type: 'bishop', color: 'white', position: 'g2' },
        { type: 'rook', color: 'white', position: 'a1' },
        { type: 'queen', color: 'white', position: 'd1' },
        { type: 'king', color: 'white', position: 'e1' },
        { type: 'rook', color: 'white', position: 'h1' }
      ],
      correctMove: 'e4-d6, b7-c6',
      explanation: "1. Nxd6: Beyaz at (3 puan) d6'daki siyah veziri (9 puan) alır. 2. Bxc6: Siyah fil b7'den c6'daki beyaz atı alır. Sonuç: Beyaz 6 puanlık avantajlı değişim yapar (9-3=6 puan kazanç)."
    },
    {
      id: 34,
      title: "Alıştırma 34: Avantajlı Taş Değişimi",
      description: "Beyazın en iyi taş değişimi hamlesi nedir? Puan hesabı yapın.",
      board: [
        { type: 'rook', color: 'black', position: 'a8' },
        { type: 'rook', color: 'black', position: 'e8' },
        { type: 'pawn', color: 'black', position: 'a7' },
        { type: 'pawn', color: 'black', position: 'b7' },
        { type: 'knight', color: 'black', position: 'd7' },
        { type: 'knight', color: 'white', position: 'f7' },
        { type: 'pawn', color: 'black', position: 'g7' },
        { type: 'king', color: 'black', position: 'h7' },
        { type: 'knight', color: 'black', position: 'f6' },
        { type: 'pawn', color: 'black', position: 'g6' },
        { type: 'pawn', color: 'black', position: 'c5' },
        { type: 'queen', color: 'black', position: 'e5' },
        { type: 'pawn', color: 'white', position: 'a4' },
        { type: 'bishop', color: 'white', position: 'a3' },
        { type: 'pawn', color: 'white', position: 'c3' },
        { type: 'pawn', color: 'white', position: 'f2' },
        { type: 'pawn', color: 'white', position: 'g2' },
        { type: 'pawn', color: 'white', position: 'h2' },
        { type: 'rook', color: 'white', position: 'a1' },
        { type: 'queen', color: 'white', position: 'b1' },
        { type: 'king', color: 'white', position: 'g1' }
      ],
      correctMove: 'f7-e5, e8-e5',
      explanation: "1. Nxe5: Beyaz at (3 puan) e5'teki siyah veziri (9 puan) alır. 2. Rxe5: Siyah kale e8'den e5'teki beyaz atı alır. Sonuç: Beyaz 6 puanlık avantajlı değişim yapar (9-3=6 puan kazanç)."
    },
    {
      id: 35,
      title: "Alıştırma 35: Avantajlı Taş Değişimi",
      description: "Beyazın en iyi taş değişimi hamlesi nedir? Puan hesabı yapın.",
      board: [
        { type: 'rook', color: 'black', position: 'a8' },
        { type: 'bishop', color: 'black', position: 'c8' },
        { type: 'queen', color: 'black', position: 'd8' },
        { type: 'king', color: 'black', position: 'e8' },
        { type: 'bishop', color: 'black', position: 'f8' },
        { type: 'rook', color: 'black', position: 'h8' },
        { type: 'pawn', color: 'black', position: 'b7' },
        { type: 'pawn', color: 'black', position: 'a6' },
        { type: 'knight', color: 'white', position: 'e6' },
        { type: 'pawn', color: 'black', position: 'g6' },
        { type: 'pawn', color: 'black', position: 'h6' },
        { type: 'knight', color: 'black', position: 'c5' },
        { type: 'pawn', color: 'white', position: 'e5' },
        { type: 'knight', color: 'white', position: 'c3' },
        { type: 'pawn', color: 'white', position: 'a2' },
        { type: 'pawn', color: 'white', position: 'b2' },
        { type: 'pawn', color: 'white', position: 'c2' },
        { type: 'queen', color: 'white', position: 'e2' },
        { type: 'pawn', color: 'white', position: 'g2' },
        { type: 'pawn', color: 'white', position: 'h2' },
        { type: 'king', color: 'white', position: 'c1' },
        { type: 'rook', color: 'white', position: 'h1' }
      ],
      correctMove: 'e6-d8, e8-d8',
      explanation: "1. Nxd8: Beyaz at (3 puan) d8'deki siyah veziri (9 puan) alır. 2. Kxd8: Siyah şah e8'den d8'deki beyaz atı alır. Sonuç: Beyaz 6 puanlık avantajlı değişim yapar (9-3=6 puan kazanç)."
    },
    {
      id: 36,
      title: "Alıştırma 36: Avantajlı Taş Değişimi",
      description: "Beyazın en iyi taş değişimi hamlesi nedir? Puan hesabı yapın.",
      board: [
        { type: 'rook', color: 'black', position: 'a8' },
        { type: 'knight', color: 'black', position: 'b8' },
        { type: 'king', color: 'black', position: 'f8' },
        { type: 'rook', color: 'black', position: 'h8' },
        { type: 'knight', color: 'black', position: 'd7' },
        { type: 'bishop', color: 'black', position: 'e7' },
        { type: 'pawn', color: 'black', position: 'f7' },
        { type: 'knight', color: 'white', position: 'g7' },
        { type: 'pawn', color: 'black', position: 'h7' },
        { type: 'pawn', color: 'black', position: 'a6' },
        { type: 'queen', color: 'black', position: 'e6' },
        { type: 'pawn', color: 'white', position: 'g5' },
        { type: 'pawn', color: 'black', position: 'b4' },
        { type: 'bishop', color: 'white', position: 'e3' },
        { type: 'pawn', color: 'white', position: 'a2' },
        { type: 'pawn', color: 'white', position: 'b2' },
        { type: 'pawn', color: 'white', position: 'c2' },
        { type: 'queen', color: 'white', position: 'd2' },
        { type: 'pawn', color: 'white', position: 'h2' },
        { type: 'king', color: 'white', position: 'c1' },
        { type: 'rook', color: 'white', position: 'd1' },
        { type: 'rook', color: 'white', position: 'h1' }
      ],
      correctMove: 'g7-e6, f7-e6',
      explanation: "1. Nxe6: Beyaz at (3 puan) e6'daki siyah veziri (9 puan) alır. 2. fxe6: Siyah piyon f7'den e6'daki beyaz atı alır. Sonuç: Beyaz 6 puanlık avantajlı değişim yapar (9-3=6 puan kazanç)."
    },
    {
      id: 37,
      title: "Alıştırma 37: Avantajlı Taş Değişimi",
      description: "Beyazın en iyi taş değişimi hamlesi nedir? Puan hesabı yapın.",
      board: [
        { type: 'king', color: 'black', position: 'f8' },
        { type: 'pawn', color: 'black', position: 'c7' },
        { type: 'pawn', color: 'black', position: 'h7' },
        { type: 'pawn', color: 'black', position: 'b6' },
        { type: 'pawn', color: 'black', position: 'd6' },
        { type: 'knight', color: 'black', position: 'c5' },
        { type: 'pawn', color: 'white', position: 'd5' },
        { type: 'bishop', color: 'white', position: 'h5' },
        { type: 'pawn', color: 'black', position: 'a4' },
        { type: 'rook', color: 'black', position: 'f4' },
        { type: 'pawn', color: 'white', position: 'a3' },
        { type: 'bishop', color: 'white', position: 'c3' },
        { type: 'bishop', color: 'black', position: 'd3' },
        { type: 'pawn', color: 'white', position: 'g3' },
        { type: 'king', color: 'white', position: 'h3' },
        { type: 'pawn', color: 'white', position: 'b2' },
        { type: 'queen', color: 'black', position: 'e2' },
        { type: 'pawn', color: 'white', position: 'h2' },
        { type: 'queen', color: 'white', position: 'd1' }
      ],
      correctMove: 'c3-e2',
      explanation: "1. Bxe2: Beyaz fil (3 puan) e2'deki siyah veziri (9 puan) alır. Sonuç: Beyaz 6 puanlık avantajlı değişim yapar (9-3=6 puan kazanç). Not: c3'teki veya h5'teki beyaz fil kullanılabilir."
    },
    {
      id: 38,
      title: "Alıştırma 38: Avantajlı Taş Değişimi",
      description: "Beyazın en iyi taş değişimi hamlesi nedir? Puan hesabı yapın.",
      board: [
        { type: 'king', color: 'black', position: 'c8' },
        { type: 'rook', color: 'black', position: 'd8' },
        { type: 'bishop', color: 'black', position: 'f8' },
        { type: 'rook', color: 'black', position: 'h8' },
        { type: 'pawn', color: 'black', position: 'a7' },
        { type: 'knight', color: 'black', position: 'd7' },
        { type: 'bishop', color: 'black', position: 'f7' },
        { type: 'pawn', color: 'black', position: 'g7' },
        { type: 'pawn', color: 'black', position: 'h7' },
        { type: 'queen', color: 'black', position: 'b6' },
        { type: 'pawn', color: 'black', position: 'e6' },
        { type: 'rook', color: 'white', position: 'a5' },
        { type: 'pawn', color: 'black', position: 'd5' },
        { type: 'pawn', color: 'white', position: 'e5' },
        { type: 'knight', color: 'black', position: 'f5' },
        { type: 'pawn', color: 'white', position: 'h5' },
        { type: 'pawn', color: 'white', position: 'b4' },
        { type: 'pawn', color: 'black', position: 'c4' },
        { type: 'pawn', color: 'white', position: 'f4' },
        { type: 'pawn', color: 'white', position: 'g4' },
        { type: 'knight', color: 'white', position: 'c3' },
        { type: 'bishop', color: 'white', position: 'e3' },
        { type: 'pawn', color: 'white', position: 'c2' },
        { type: 'queen', color: 'white', position: 'd1' },
        { type: 'king', color: 'white', position: 'e1' },
        { type: 'bishop', color: 'white', position: 'f1' },
        { type: 'rook', color: 'white', position: 'h1' }
      ],
      correctMove: 'e3-b6, d7-b6',
      explanation: "1. Bxb6: Beyaz fil (3 puan) b6'daki siyah veziri (9 puan) alır. 2. Nxb6: Siyah at d7'den b6'daki beyaz fili alır. Sonuç: Beyaz 6 puanlık avantajlı değişim yapar (9-3=6 puan kazanç)."
    },
    {
      id: 39,
      title: "Alıştırma 39: Avantajlı Taş Değişimi",
      description: "Beyazın en iyi taş değişimi hamlesi nedir? Puan hesabı yapın.",
      board: [
        { type: 'rook', color: 'black', position: 'c8' },
        { type: 'rook', color: 'black', position: 'f8' },
        { type: 'king', color: 'black', position: 'g8' },
        { type: 'pawn', color: 'black', position: 'a7' },
        { type: 'bishop', color: 'black', position: 'b7' },
        { type: 'knight', color: 'black', position: 'e7' },
        { type: 'pawn', color: 'black', position: 'f7' },
        { type: 'pawn', color: 'black', position: 'g7' },
        { type: 'pawn', color: 'black', position: 'h7' },
        { type: 'pawn', color: 'black', position: 'b6' },
        { type: 'knight', color: 'black', position: 'c6' },
        { type: 'pawn', color: 'black', position: 'e6' },
        { type: 'queen', color: 'black', position: 'f6' },
        { type: 'pawn', color: 'white', position: 'e4' },
        { type: 'pawn', color: 'white', position: 'b3' },
        { type: 'pawn', color: 'white', position: 'g3' },
        { type: 'pawn', color: 'white', position: 'a2' },
        { type: 'bishop', color: 'white', position: 'b2' },
        { type: 'pawn', color: 'white', position: 'f2' },
        { type: 'bishop', color: 'white', position: 'g2' },
        { type: 'pawn', color: 'white', position: 'h2' },
        { type: 'rook', color: 'white', position: 'c1' },
        { type: 'queen', color: 'white', position: 'd1' },
        { type: 'rook', color: 'white', position: 'f1' },
        { type: 'king', color: 'white', position: 'g1' }
      ],
      correctMove: 'g2-f6, g7-f6',
      explanation: "1. Bxf6: Beyaz fil (3 puan) f6'daki siyah veziri (9 puan) alır. 2. gxf6: Siyah piyon g7'den f6'daki beyaz fili alır. Sonuç: Beyaz 6 puanlık avantajlı değişim yapar (9-3=6 puan kazanç)."
    },
    {
      id: 40,
      title: "Alıştırma 40: Avantajlı Taş Değişimi",
      description: "Beyazın en iyi taş değişimi hamlesi nedir? Puan hesabı yapın.",
      board: [
        { type: 'king', color: 'black', position: 'e8' },
        { type: 'rook', color: 'black', position: 'h8' },
        { type: 'pawn', color: 'black', position: 'a7' },
        { type: 'knight', color: 'black', position: 'd7' },
        { type: 'pawn', color: 'black', position: 'f7' },
        { type: 'pawn', color: 'black', position: 'g7' },
        { type: 'pawn', color: 'black', position: 'h7' },
        { type: 'bishop', color: 'white', position: 'c6' },
        { type: 'queen', color: 'white', position: 'd6' },
        { type: 'pawn', color: 'black', position: 'e6' },
        { type: 'queen', color: 'black', position: 'd5' },
        { type: 'bishop', color: 'white', position: 'e3' },
        { type: 'king', color: 'white', position: 'e2' },
        { type: 'pawn', color: 'white', position: 'f2' },
        { type: 'pawn', color: 'white', position: 'g2' },
        { type: 'pawn', color: 'white', position: 'h2' }
      ],
      correctMove: 'e3-d5, e6-d5',
      explanation: "1. Bxd5: Beyaz fil (3 puan) d5'teki siyah veziri (9 puan) alır. 2. exd5: Siyah piyon e6'dan d5'teki beyaz fili alır. Sonuç: Beyaz 6 puanlık avantajlı değişim yapar (9-3=6 puan kazanç)."
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
      const currentPlayer = isWhiteTurn ? 'white' : 'black';
      if (piece && piece.color === currentPlayer) {
        setSelectedSquare(position);
        const moves = getPossibleMoves(piece, currentBoard);
        setPossibleMoves(moves);
      }
    } else {
      // İkinci tıklama - hamle yapma
      if (possibleMoves.includes(position)) {
        const move = `${selectedSquare}-${position}`;
        const newMoveSequence = [...moveSequence, move];
        setMoveSequence(newMoveSequence);
        
        // Hamle yapınca taşların pozisyonunu güncelle
        const updatedBoard = currentBoard.map(piece => {
          if (piece.position === selectedSquare) {
            // Seçilen taşı yeni pozisyona taşı
            return { ...piece, position: position };
          } else if (piece.position === position && piece.color !== (isWhiteTurn ? 'white' : 'black')) {
            // Alınan taşı kaldır
            return null;
          }
          return piece;
        }).filter(piece => piece !== null) as ChessPiece[];
        
        // Board'u güncelle
        setCurrentBoard(updatedBoard);
        
        // Sıra değiştir
        setIsWhiteTurn(!isWhiteTurn);
        
        // Puzzle'a göre özel mantık
        if (currentPuzzle === 0 && move === 'e5-f6') {
          // Alıştırma 21: Beyaz piyon f6'ya gitti, şimdi siyah şah otomatik olarak f6'ya gidecek
          setTimeout(() => {
            const kingMove = 'g7-f6';
            const finalMoveSequence = [...newMoveSequence, kingMove];
            setMoveSequence(finalMoveSequence);
            
            // Şahı f6'ya taşı
            const finalBoard = updatedBoard.map(piece => {
              if (piece.position === 'g7' && piece.type === 'king' && piece.color === 'black') {
                return { ...piece, position: 'f6' };
              } else if (piece.position === 'f6' && piece.type === 'pawn' && piece.color === 'white') {
                // Piyonu kaldır
                return null;
              }
              return piece;
            }).filter(piece => piece !== null) as ChessPiece[];
            
            setCurrentBoard(finalBoard);
            setShowResult(true);
            
            // Doğru hamle kontrolü
            const finalMoveString = finalMoveSequence.join(', ');
            const correctMoveString = puzzles[currentPuzzle].correctMove;
            const isCorrect = finalMoveString === correctMoveString;
            
            console.log('Debug - Final Move Sequence:', finalMoveSequence);
            console.log('Debug - Final Move String:', finalMoveString);
            console.log('Debug - Correct Move:', correctMoveString);
            console.log('Debug - Is Correct:', isCorrect);
            
            setIsCorrectMove(isCorrect);
            
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
          }, 1000); // 1 saniye bekle
        } else if (currentPuzzle === 3 && move === 'g4-f5') {
          // Alıştırma 24: Beyaz piyon f5'teki kaleyi aldı, şimdi siyah piyon otomatik olarak f5'teki piyonu alacak
          setTimeout(() => {
            const pawnMove = 'e6-f5';
            const finalMoveSequence = [...newMoveSequence, pawnMove];
            setMoveSequence(finalMoveSequence);
            
            // Siyah piyonu f5'e taşı ve beyaz piyonu kaldır
            const finalBoard = updatedBoard.map(piece => {
              if (piece.position === 'e6' && piece.type === 'pawn' && piece.color === 'black') {
                return { ...piece, position: 'f5' };
              } else if (piece.position === 'f5' && piece.type === 'pawn' && piece.color === 'white') {
                // Beyaz piyonu kaldır
                return null;
              }
              return piece;
            }).filter(piece => piece !== null) as ChessPiece[];
            
            setCurrentBoard(finalBoard);
            setShowResult(true);
            
            // Doğru hamle kontrolü
            const finalMoveString = finalMoveSequence.join(', ');
            const correctMoveString = puzzles[currentPuzzle].correctMove;
            const isCorrect = finalMoveString === correctMoveString;
            
            console.log('Debug - Final Move Sequence:', finalMoveSequence);
            console.log('Debug - Final Move String:', finalMoveString);
            console.log('Debug - Correct Move:', correctMoveString);
            console.log('Debug - Is Correct:', isCorrect);
            
            setIsCorrectMove(isCorrect);
            
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
          }, 1000); // 1 saniye bekle
        } else if (currentPuzzle === 4 && move === 'd5-b5') {
          // Alıştırma 25: Beyaz kale b5'teki veziri aldı, şimdi siyah vezir otomatik olarak b5'teki kaleyi alacak
          setTimeout(() => {
            const queenMove = 'b5-b5';
            const finalMoveSequence = [...newMoveSequence, queenMove];
            setMoveSequence(finalMoveSequence);
            
            // Siyah veziri b5'e taşı ve beyaz kaleyi kaldır
            const finalBoard = updatedBoard.map(piece => {
              if (piece.position === 'b5' && piece.type === 'queen' && piece.color === 'black') {
                return { ...piece, position: 'b5' }; // Vezir zaten b5'te
              } else if (piece.position === 'b5' && piece.type === 'rook' && piece.color === 'white') {
                // Beyaz kaleyi kaldır
                return null;
              }
              return piece;
            }).filter(piece => piece !== null) as ChessPiece[];
            
            setCurrentBoard(finalBoard);
            setShowResult(true);
            
            // Doğru hamle kontrolü
            const finalMoveString = finalMoveSequence.join(', ');
            const correctMoveString = puzzles[currentPuzzle].correctMove;
            const isCorrect = finalMoveString === correctMoveString;
            
            console.log('Debug - Final Move Sequence:', finalMoveSequence);
            console.log('Debug - Final Move String:', finalMoveString);
            console.log('Debug - Correct Move:', correctMoveString);
            console.log('Debug - Is Correct:', isCorrect);
            
            setIsCorrectMove(isCorrect);
            
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
          }, 1000); // 1 saniye bekle
        } else if (currentPuzzle === 5 && move === 'f1-f6') {
          // Alıştırma 26: Beyaz kale f6'daki veziri aldı, şimdi siyah at otomatik olarak f6'daki kaleyi alacak
          setTimeout(() => {
            const knightMove = 'e8-f6';
            const finalMoveSequence = [...newMoveSequence, knightMove];
            setMoveSequence(finalMoveSequence);
            
            // Siyah atı f6'ya taşı ve beyaz kaleyi kaldır
            const finalBoard = updatedBoard.map(piece => {
              if (piece.position === 'e8' && piece.type === 'knight' && piece.color === 'black') {
                return { ...piece, position: 'f6' };
              } else if (piece.position === 'f6' && piece.type === 'rook' && piece.color === 'white') {
                // Beyaz kaleyi kaldır
                return null;
              }
              return piece;
            }).filter(piece => piece !== null) as ChessPiece[];
            
            setCurrentBoard(finalBoard);
            setShowResult(true);
            
            // Doğru hamle kontrolü
            const finalMoveString = finalMoveSequence.join(', ');
            const correctMoveString = puzzles[currentPuzzle].correctMove;
            const isCorrect = finalMoveString === correctMoveString;
            
            console.log('Debug - Final Move Sequence:', finalMoveSequence);
            console.log('Debug - Final Move String:', finalMoveString);
            console.log('Debug - Correct Move:', correctMoveString);
            console.log('Debug - Is Correct:', isCorrect);
            
            setIsCorrectMove(isCorrect);
            
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
          }, 1000); // 1 saniye bekle
        } else if (currentPuzzle === 6 && move === 'd1-d8') {
          // Alıştırma 27: Beyaz kale d8'deki veziri aldı, şimdi siyah fil otomatik olarak d8'deki kaleyi alacak
          setTimeout(() => {
            const bishopMove = 'e7-d8';
            const finalMoveSequence = [...newMoveSequence, bishopMove];
            setMoveSequence(finalMoveSequence);
            
            // Siyah fili d8'e taşı ve beyaz kaleyi kaldır
            const finalBoard = updatedBoard.map(piece => {
              if (piece.position === 'e7' && piece.type === 'bishop' && piece.color === 'black') {
                return { ...piece, position: 'd8' };
              } else if (piece.position === 'd8' && piece.type === 'rook' && piece.color === 'white') {
                // Beyaz kaleyi kaldır
                return null;
              }
              return piece;
            }).filter(piece => piece !== null) as ChessPiece[];
            
            setCurrentBoard(finalBoard);
            setShowResult(true);
            
            // Doğru hamle kontrolü
            const finalMoveString = finalMoveSequence.join(', ');
            const correctMoveString = puzzles[currentPuzzle].correctMove;
            const isCorrect = finalMoveString === correctMoveString;
            
            console.log('Debug - Final Move Sequence:', finalMoveSequence);
            console.log('Debug - Final Move String:', finalMoveString);
            console.log('Debug - Correct Move:', correctMoveString);
            console.log('Debug - Is Correct:', isCorrect);
            
            setIsCorrectMove(isCorrect);
            
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
          }, 1000); // 1 saniye bekle
        } else if (currentPuzzle === 7 && move === 'c1-c5') {
          // Alıştırma 28: Beyaz kale c5'teki veziri aldı, şimdi siyah fil otomatik olarak e5'teki kaleyi alacak
          setTimeout(() => {
            const bishopMove = 'b7-e5';
            const finalMoveSequence = [...newMoveSequence, bishopMove];
            setMoveSequence(finalMoveSequence);
            
            // Siyah fili e5'e taşı ve beyaz kaleyi kaldır
            const finalBoard = updatedBoard.map(piece => {
              if (piece.position === 'b7' && piece.type === 'bishop' && piece.color === 'black') {
                return { ...piece, position: 'e5' };
              } else if (piece.position === 'e5' && piece.type === 'rook' && piece.color === 'white') {
                // Beyaz kaleyi kaldır
                return null;
              }
              return piece;
            }).filter(piece => piece !== null) as ChessPiece[];
            
            setCurrentBoard(finalBoard);
            setShowResult(true);
            
            // Doğru hamle kontrolü
            const finalMoveString = finalMoveSequence.join(', ');
            const correctMoveString = puzzles[currentPuzzle].correctMove;
            const isCorrect = finalMoveString === correctMoveString;
            
            console.log('Debug - Final Move Sequence:', finalMoveSequence);
            console.log('Debug - Final Move String:', finalMoveString);
            console.log('Debug - Correct Move:', correctMoveString);
            console.log('Debug - Is Correct:', isCorrect);
            
            setIsCorrectMove(isCorrect);
            
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
          }, 1000); // 1 saniye bekle
        } else if (currentPuzzle === 8 && move === 'f1-f6') {
          // Alıştırma 29: Beyaz kale f6'daki veziri aldı, şimdi siyah at otomatik olarak f6'daki kaleyi alacak
          setTimeout(() => {
            const knightMove = 'h7-f6';
            const finalMoveSequence = [...newMoveSequence, knightMove];
            setMoveSequence(finalMoveSequence);
            
            // Siyah atı f6'ya taşı ve beyaz kaleyi kaldır
            const finalBoard = updatedBoard.map(piece => {
              if (piece.position === 'h7' && piece.type === 'knight' && piece.color === 'black') {
                return { ...piece, position: 'f6' };
              } else if (piece.position === 'f6' && piece.type === 'rook' && piece.color === 'white') {
                // Beyaz kaleyi kaldır
                return null;
              }
              return piece;
            }).filter(piece => piece !== null) as ChessPiece[];
            
            setCurrentBoard(finalBoard);
            setShowResult(true);
            
            // Doğru hamle kontrolü
            const finalMoveString = finalMoveSequence.join(', ');
            const correctMoveString = puzzles[currentPuzzle].correctMove;
            const isCorrect = finalMoveString === correctMoveString;
            
            console.log('Debug - Final Move Sequence:', finalMoveSequence);
            console.log('Debug - Final Move String:', finalMoveString);
            console.log('Debug - Correct Move:', correctMoveString);
            console.log('Debug - Is Correct:', isCorrect);
            
            setIsCorrectMove(isCorrect);
            
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
          }, 1000); // 1 saniye bekle
        } else if (currentPuzzle === 9 && move === 'e1-e4') {
          // Alıştırma 30: Beyaz kale e4'teki veziri aldı, şimdi siyah kale otomatik olarak e4'teki kaleyi alacak
          setTimeout(() => {
            const rookMove = 'e8-e4';
            const finalMoveSequence = [...newMoveSequence, rookMove];
            setMoveSequence(finalMoveSequence);
            
            // Siyah kaleyi e4'e taşı ve beyaz kaleyi kaldır
            const finalBoard = updatedBoard.map(piece => {
              if (piece.position === 'e8' && piece.type === 'rook' && piece.color === 'black') {
                return { ...piece, position: 'e4' };
              } else if (piece.position === 'e4' && piece.type === 'rook' && piece.color === 'white') {
                // Beyaz kaleyi kaldır
                return null;
              }
              return piece;
            }).filter(piece => piece !== null) as ChessPiece[];
            
            setCurrentBoard(finalBoard);
            setShowResult(true);
            
            // Doğru hamle kontrolü
            const finalMoveString = finalMoveSequence.join(', ');
            const correctMoveString = puzzles[currentPuzzle].correctMove;
            const isCorrect = finalMoveString === correctMoveString;
            
            console.log('Debug - Final Move Sequence:', finalMoveSequence);
            console.log('Debug - Final Move String:', finalMoveString);
            console.log('Debug - Correct Move:', correctMoveString);
            console.log('Debug - Is Correct:', isCorrect);
            
            setIsCorrectMove(isCorrect);
            
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
          }, 1000); // 1 saniye bekle
        } else if (currentPuzzle === 11 && move === 'g3-g6') {
          // Alıştırma 32: Beyaz kale g6'daki veziri aldı, şimdi siyah at otomatik olarak g6'daki kaleyi alacak
          setTimeout(() => {
            const knightMove = 'e7-g6';
            const finalMoveSequence = [...newMoveSequence, knightMove];
            setMoveSequence(finalMoveSequence);
            
            // Siyah atı g6'ya taşı ve beyaz kaleyi kaldır
            const finalBoard = updatedBoard.map(piece => {
              if (piece.position === 'e7' && piece.type === 'knight' && piece.color === 'black') {
                return { ...piece, position: 'g6' };
              } else if (piece.position === 'g6' && piece.type === 'rook' && piece.color === 'white') {
                // Beyaz kaleyi kaldır
                return null;
              }
              return piece;
            }).filter(piece => piece !== null) as ChessPiece[];
            
            setCurrentBoard(finalBoard);
            setShowResult(true);
            
            // Doğru hamle kontrolü
            const finalMoveString = finalMoveSequence.join(', ');
            const correctMoveString = puzzles[currentPuzzle].correctMove;
            const isCorrect = finalMoveString === correctMoveString;
            
            console.log('Debug - Final Move Sequence:', finalMoveSequence);
            console.log('Debug - Final Move String:', finalMoveString);
            console.log('Debug - Correct Move:', correctMoveString);
            console.log('Debug - Is Correct:', isCorrect);
            
            setIsCorrectMove(isCorrect);
            
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
          }, 1000); // 1 saniye bekle
        } else if (currentPuzzle === 13 && move === 'f7-e5') {
          // Alıştırma 34: Beyaz at e5'teki veziri aldı, şimdi siyah kale otomatik olarak e5'teki atı alacak
          setTimeout(() => {
            const rookMove = 'e8-e5';
            const finalMoveSequence = [...newMoveSequence, rookMove];
            setMoveSequence(finalMoveSequence);
            
            // Siyah kaleyi e5'e taşı ve beyaz atı kaldır
            const finalBoard = updatedBoard.map(piece => {
              if (piece.position === 'e8' && piece.type === 'rook' && piece.color === 'black') {
                return { ...piece, position: 'e5' };
              } else if (piece.position === 'e5' && piece.type === 'knight' && piece.color === 'white') {
                // Beyaz atı kaldır
                return null;
              }
              return piece;
            }).filter(piece => piece !== null) as ChessPiece[];
            
            setCurrentBoard(finalBoard);
            setShowResult(true);
            
            // Doğru hamle kontrolü
            const finalMoveString = finalMoveSequence.join(', ');
            const correctMoveString = puzzles[currentPuzzle].correctMove;
            const isCorrect = finalMoveString === correctMoveString;
            
            console.log('Debug - Final Move Sequence:', finalMoveSequence);
            console.log('Debug - Final Move String:', finalMoveString);
            console.log('Debug - Correct Move:', correctMoveString);
            console.log('Debug - Is Correct:', isCorrect);
            
            setIsCorrectMove(isCorrect);
            
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
          }, 1000); // 1 saniye bekle
        } else if (currentPuzzle === 12 && move === 'e4-d6') {
          // Alıştırma 33: Beyaz at d6'daki veziri aldı, şimdi siyah fil otomatik olarak c6'daki atı alacak
          setTimeout(() => {
            const bishopMove = 'b7-c6';
            const finalMoveSequence = [...newMoveSequence, bishopMove];
            setMoveSequence(finalMoveSequence);
            
            // Siyah fili c6'ya taşı ve beyaz atı kaldır
            const finalBoard = updatedBoard.map(piece => {
              if (piece.position === 'b7' && piece.type === 'bishop' && piece.color === 'black') {
                return { ...piece, position: 'c6' };
              } else if (piece.position === 'c6' && piece.type === 'knight' && piece.color === 'white') {
                // Beyaz atı kaldır
                return null;
              }
              return piece;
            }).filter(piece => piece !== null) as ChessPiece[];
            
            setCurrentBoard(finalBoard);
            setShowResult(true);
            
            // Doğru hamle kontrolü
            const finalMoveString = finalMoveSequence.join(', ');
            const correctMoveString = puzzles[currentPuzzle].correctMove;
            const isCorrect = finalMoveString === correctMoveString;
            
            console.log('Debug - Final Move Sequence:', finalMoveSequence);
            console.log('Debug - Final Move String:', finalMoveString);
            console.log('Debug - Correct Move:', correctMoveString);
            console.log('Debug - Is Correct:', isCorrect);
            
            setIsCorrectMove(isCorrect);
            
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
          }, 1000); // 1 saniye bekle
        } else if (currentPuzzle === 14 && move === 'e6-d8') {
          // Alıştırma 35: Beyaz at d8'deki veziri aldı, şimdi siyah şah otomatik olarak d8'deki atı alacak
          setTimeout(() => {
            const kingMove = 'e8-d8';
            const finalMoveSequence = [...newMoveSequence, kingMove];
            setMoveSequence(finalMoveSequence);
            
            // Siyah şahı d8'e taşı ve beyaz atı kaldır
            const finalBoard = updatedBoard.map(piece => {
              if (piece.position === 'e8' && piece.type === 'king' && piece.color === 'black') {
                return { ...piece, position: 'd8' };
              } else if (piece.position === 'd8' && piece.type === 'knight' && piece.color === 'white') {
                // Beyaz atı kaldır
                return null;
              }
              return piece;
            }).filter(piece => piece !== null) as ChessPiece[];
            
            setCurrentBoard(finalBoard);
            setShowResult(true);
            
            // Doğru hamle kontrolü
            const finalMoveString = finalMoveSequence.join(', ');
            const correctMoveString = puzzles[currentPuzzle].correctMove;
            const isCorrect = finalMoveString === correctMoveString;
            
            console.log('Debug - Final Move Sequence:', finalMoveSequence);
            console.log('Debug - Final Move String:', finalMoveString);
            console.log('Debug - Correct Move:', correctMoveString);
            console.log('Debug - Is Correct:', isCorrect);
            
            setIsCorrectMove(isCorrect);
            
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
          }, 1000); // 1 saniye bekle
        } else if (currentPuzzle === 15 && move === 'g7-e6') {
          // Alıştırma 36: Beyaz at e6'daki veziri aldı, şimdi siyah piyon otomatik olarak e6'daki atı alacak
          setTimeout(() => {
            const pawnMove = 'f7-e6';
            const finalMoveSequence = [...newMoveSequence, pawnMove];
            setMoveSequence(finalMoveSequence);
            
            // Siyah piyonu e6'ya taşı ve beyaz atı kaldır
            const finalBoard = updatedBoard.map(piece => {
              if (piece.position === 'f7' && piece.type === 'pawn' && piece.color === 'black') {
                return { ...piece, position: 'e6' };
              } else if (piece.position === 'e6' && piece.type === 'knight' && piece.color === 'white') {
                // Beyaz atı kaldır
                return null;
              }
              return piece;
            }).filter(piece => piece !== null) as ChessPiece[];
            
            setCurrentBoard(finalBoard);
            setShowResult(true);
            
            // Doğru hamle kontrolü
            const finalMoveString = finalMoveSequence.join(', ');
            const correctMoveString = puzzles[currentPuzzle].correctMove;
            const isCorrect = finalMoveString === correctMoveString;
            
            console.log('Debug - Final Move Sequence:', finalMoveSequence);
            console.log('Debug - Final Move String:', finalMoveString);
            console.log('Debug - Correct Move:', correctMoveString);
            console.log('Debug - Is Correct:', isCorrect);
            
            setIsCorrectMove(isCorrect);
            
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
          }, 1000); // 1 saniye bekle
        } else if (currentPuzzle === 17 && move === 'e3-b6') {
          // Alıştırma 38: Beyaz fil b6'daki veziri aldı, şimdi siyah at otomatik olarak b6'daki fili alacak
          setTimeout(() => {
            const knightMove = 'd7-b6';
            const finalMoveSequence = [...newMoveSequence, knightMove];
            setMoveSequence(finalMoveSequence);
            
            // Siyah atı b6'ya taşı ve beyaz fili kaldır
            const finalBoard = updatedBoard.map(piece => {
              if (piece.position === 'd7' && piece.type === 'knight' && piece.color === 'black') {
                return { ...piece, position: 'b6' };
              } else if (piece.position === 'b6' && piece.type === 'bishop' && piece.color === 'white') {
                // Beyaz fili kaldır
                return null;
              }
              return piece;
            }).filter(piece => piece !== null) as ChessPiece[];
            
            setCurrentBoard(finalBoard);
            setShowResult(true);
            
            // Doğru hamle kontrolü
            const finalMoveString = finalMoveSequence.join(', ');
            const correctMoveString = puzzles[currentPuzzle].correctMove;
            const isCorrect = finalMoveString === correctMoveString;
            
            console.log('Debug - Final Move Sequence:', finalMoveSequence);
            console.log('Debug - Final Move String:', finalMoveString);
            console.log('Debug - Correct Move:', correctMoveString);
            console.log('Debug - Is Correct:', isCorrect);
            
            setIsCorrectMove(isCorrect);
            
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
          }, 1000); // 1 saniye bekle
        } else if (currentPuzzle === 18 && move === 'g2-f6') {
          // Alıştırma 39: Beyaz fil f6'daki veziri aldı, şimdi siyah piyon otomatik olarak f6'daki fili alacak
          setTimeout(() => {
            const pawnMove = 'g7-f6';
            const finalMoveSequence = [...newMoveSequence, pawnMove];
            setMoveSequence(finalMoveSequence);
            
            // Siyah piyonu f6'ya taşı ve beyaz fili kaldır
            const finalBoard = updatedBoard.map(piece => {
              if (piece.position === 'g7' && piece.type === 'pawn' && piece.color === 'black') {
                return { ...piece, position: 'f6' };
              } else if (piece.position === 'f6' && piece.type === 'bishop' && piece.color === 'white') {
                // Beyaz fili kaldır
                return null;
              }
              return piece;
            }).filter(piece => piece !== null) as ChessPiece[];
            
            setCurrentBoard(finalBoard);
            setShowResult(true);
            
            // Doğru hamle kontrolü
            const finalMoveString = finalMoveSequence.join(', ');
            const correctMoveString = puzzles[currentPuzzle].correctMove;
            const isCorrect = finalMoveString === correctMoveString;
            
            console.log('Debug - Final Move Sequence:', finalMoveSequence);
            console.log('Debug - Final Move String:', finalMoveString);
            console.log('Debug - Correct Move:', correctMoveString);
            console.log('Debug - Is Correct:', isCorrect);
            
            setIsCorrectMove(isCorrect);
            
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
          }, 1000); // 1 saniye bekle
        } else if (currentPuzzle === 19 && move === 'e3-d5') {
          // Alıştırma 40: Beyaz fil d5'teki veziri aldı, şimdi siyah piyon otomatik olarak d5'teki fili alacak
          setTimeout(() => {
            const pawnMove = 'e6-d5';
            const finalMoveSequence = [...newMoveSequence, pawnMove];
            setMoveSequence(finalMoveSequence);
            
            // Siyah piyonu d5'e taşı ve beyaz fili kaldır
            const finalBoard = updatedBoard.map(piece => {
              if (piece.position === 'e6' && piece.type === 'pawn' && piece.color === 'black') {
                return { ...piece, position: 'd5' };
              } else if (piece.position === 'd5' && piece.type === 'bishop' && piece.color === 'white') {
                // Beyaz fili kaldır
                return null;
              }
              return piece;
            }).filter(piece => piece !== null) as ChessPiece[];
            
            setCurrentBoard(finalBoard);
            setShowResult(true);
            
            // Doğru hamle kontrolü
            const finalMoveString = finalMoveSequence.join(', ');
            const correctMoveString = puzzles[currentPuzzle].correctMove;
            const isCorrect = finalMoveString === correctMoveString;
            
            console.log('Debug - Final Move Sequence:', finalMoveSequence);
            console.log('Debug - Final Move String:', finalMoveString);
            console.log('Debug - Correct Move:', correctMoveString);
            console.log('Debug - Is Correct:', isCorrect);
            
            setIsCorrectMove(isCorrect);
            
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
          }, 1000); // 1 saniye bekle
        } else if (currentPuzzle === 1 || currentPuzzle === 2 || currentPuzzle === 10 || currentPuzzle === 16) {
          // Alıştırma 22, 23, 31 ve 37: Tek hamleli puzzle'lar
          setShowResult(true);
          
          // Doğru hamle kontrolü - tek hamleli puzzle'larda moveSequence'e hamle eklenmemiş olabilir
          const moveString = moveSequence.length > 0 ? moveSequence.join(', ') : move;
          const correctMoveString = puzzles[currentPuzzle].correctMove;
          
          // Alıştırma 37 için özel kontrol: hem c3-e2 hem h5-e2 kabul edilir
          let isCorrect = moveString === correctMoveString;
          if (currentPuzzle === 16 && (moveString === 'h5-e2' || moveString === 'c3-e2')) {
            isCorrect = true;
          }
          
          console.log('Debug - Move Sequence:', moveSequence);
          console.log('Debug - Move:', move);
          console.log('Debug - Move String:', moveString);
          console.log('Debug - Correct Move:', correctMoveString);
          console.log('Debug - Is Correct:', isCorrect);
          
          setIsCorrectMove(isCorrect);
          
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
        } else if (currentPuzzle === 0 && move !== 'e5-f6') {
          // Alıştırma 21'de yanlış hamle
          setIsCorrectMove(false);
          setShowResult(true);
        } else if (currentPuzzle === 3 && move !== 'g4-f5') {
          // Alıştırma 24'te yanlış hamle
          setIsCorrectMove(false);
          setShowResult(true);
        } else if (currentPuzzle === 4 && move !== 'd5-b5') {
          // Alıştırma 25'te yanlış hamle
          setIsCorrectMove(false);
          setShowResult(true);
        } else if (currentPuzzle === 5 && move !== 'f1-f6') {
          // Alıştırma 26'da yanlış hamle
          setIsCorrectMove(false);
          setShowResult(true);
        } else if (currentPuzzle === 6 && move !== 'd1-d8') {
          // Alıştırma 27'de yanlış hamle
          setIsCorrectMove(false);
          setShowResult(true);
        } else if (currentPuzzle === 7 && move !== 'c1-c5') {
          // Alıştırma 28'de yanlış hamle
          setIsCorrectMove(false);
          setShowResult(true);
        } else if (currentPuzzle === 8 && move !== 'f1-f6') {
          // Alıştırma 29'da yanlış hamle
          setIsCorrectMove(false);
          setShowResult(true);
        } else if (currentPuzzle === 9 && move !== 'e1-e4') {
          // Alıştırma 30'da yanlış hamle
          setIsCorrectMove(false);
          setShowResult(true);
        } else if (currentPuzzle === 10 && move !== 'e1-e5') {
          // Alıştırma 31'de yanlış hamle
          setIsCorrectMove(false);
          setShowResult(true);
        } else if (currentPuzzle === 11 && move !== 'g3-g6') {
          // Alıştırma 32'de yanlış hamle
          setIsCorrectMove(false);
          setShowResult(true);
        } else if (currentPuzzle === 12 && move !== 'e4-d6') {
          // Alıştırma 33'te yanlış hamle
          setIsCorrectMove(false);
          setShowResult(true);
        } else if (currentPuzzle === 13 && move !== 'f7-e5') {
          // Alıştırma 34'te yanlış hamle
          setIsCorrectMove(false);
          setShowResult(true);
        } else if (currentPuzzle === 14 && move !== 'e6-d8') {
          // Alıştırma 35'te yanlış hamle
          setIsCorrectMove(false);
          setShowResult(true);
        } else if (currentPuzzle === 15 && move !== 'g7-e6') {
          // Alıştırma 36'da yanlış hamle
          setIsCorrectMove(false);
          setShowResult(true);
        } else if (currentPuzzle === 16 && move !== 'c3-e2' && move !== 'h5-e2') {
          // Alıştırma 37'de yanlış hamle (hem c3-e2 hem h5-e2 kabul edilir)
          setIsCorrectMove(false);
          setShowResult(true);
        } else if (currentPuzzle === 17 && move !== 'e3-b6') {
          // Alıştırma 38'de yanlış hamle
          setIsCorrectMove(false);
          setShowResult(true);
        } else if (currentPuzzle === 18 && move !== 'g2-f6') {
          // Alıştırma 39'da yanlış hamle
          setIsCorrectMove(false);
          setShowResult(true);
        } else if (currentPuzzle === 19 && move !== 'e3-d5') {
          // Alıştırma 40'ta yanlış hamle
          setIsCorrectMove(false);
          setShowResult(true);
        } else {
          // Diğer puzzle'larda yanlış hamle
          setIsCorrectMove(false);
          setShowResult(true);
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
      setMoveSequence([]);
      setCurrentMoveIndex(0);
      setIsWhiteTurn(true);
      setIsCorrectMove(false);
    }
  };

  const prevPuzzle = () => {
    if (currentPuzzle > 0) {
      setCurrentPuzzle(prev => prev - 1);
      setSelectedSquare(null);
      setPossibleMoves([]);
      setUserMove(null);
      setShowResult(false);
      setMoveSequence([]);
      setCurrentMoveIndex(0);
      setIsWhiteTurn(true);
      setIsCorrectMove(false);
    }
  };

  const resetPuzzle = () => {
    setSelectedSquare(null);
    setPossibleMoves([]);
    setUserMove(null);
    setShowResult(false);
    setCurrentBoard(puzzles[currentPuzzle].board);
    setMoveSequence([]);
    setCurrentMoveIndex(0);
    setIsWhiteTurn(true);
    setIsCorrectMove(false);
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
  const isCorrect = isCorrectMove;

  return (
    <>
      <div className="hero">
        <h2>♟️ Konu 2: Avantajlı Taş Değişimi (Puan Hesabı)</h2>
        <p>Taş değerlerini öğrenin ve avantajlı değişimler yaparak oyununuzu geliştirin</p>
      </div>

      <div className="training-container">
        <div className="training-header">
          <div className="puzzle-info">
            <h3>{puzzle.title}</h3>
            <p>{puzzle.description}</p>
            <div className="turn-indicator">
              <span className={`turn-badge ${isWhiteTurn ? 'white-turn' : 'black-turn'}`}>
                {isWhiteTurn ? '♔ Beyaz Sırası' : '♚ Siyah Sırası'}
              </span>
            </div>
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
            <p><strong>Yaptığınız Hamle:</strong> {moveSequence.join(', ')}</p>
            <p><strong>Doğru Hamle:</strong> {puzzle.correctMove}</p>
            <p><strong>Açıklama:</strong> {puzzle.explanation}</p>
            {isCorrect && <p className="score-earned">+10 puan kazandınız!</p>}
          </div>
        )}

        <div className="training-instructions">
          <h4>💰 Taş Değerleri:</h4>
          <div className="legend-items">
            <div className="legend-item">
              <span className="legend-piece">♟️</span>
              <span>Piyon: 1 puan</span>
            </div>
            <div className="legend-item">
              <span className="legend-piece">♘</span>
              <span>At: 3 puan</span>
            </div>
            <div className="legend-item">
              <span className="legend-piece">♗</span>
              <span>Fil: 3 puan</span>
            </div>
            <div className="legend-item">
              <span className="legend-piece">♖</span>
              <span>Kale: 5 puan</span>
            </div>
            <div className="legend-item">
              <span className="legend-piece">♕</span>
              <span>Vezir: 9 puan</span>
            </div>
          </div>
          
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
        <a href="/oyunlar/satrancta-tas-alisverisi-konu1" className="cta primary">Konu 1 →</a>
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

        .turn-indicator {
          margin-top: 10px;
        }

        .turn-badge {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: bold;
          transition: all 0.3s ease;
        }

        .white-turn {
          background: #f3f4f6;
          color: #374151;
          border: 2px solid #d1d5db;
        }

        .black-turn {
          background: #374151;
          color: #f3f4f6;
          border: 2px solid #6b7280;
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

        .legend-piece {
          font-size: 1.2rem;
          margin-right: 8px;
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
