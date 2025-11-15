import { TrendingUp, Shield, Layers, ArrowRight, Users, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { HyperliquidVault, formatCurrency, formatAPR, getRiskLevel, calculateAIScore, getVaultDisplayName } from '@/lib/hyperliquidClient';
import { useState, useEffect } from 'react';

interface VaultCardProps {
  vault: HyperliquidVault;
  userAddress?: string;
  isHolder?: boolean;
}

export default function VaultCard({ vault, userAddress, isHolder }: VaultCardProps) {
  const riskLevel = getRiskLevel(vault.apr);
  const aiScore = calculateAIScore(vault);
  const displayName = getVaultDisplayName(vault);
  
  const riskColors = {
    low: 'text-green-600 bg-green-50 border-green-200',
    medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    high: 'text-red-600 bg-red-50 border-red-200',
  };

  return (
    <div className="card hover:shadow-2xl transition-all duration-300 group relative overflow-hidden">
      {/* AI Score Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
          <span>🤖</span>
          <span>{Math.round(aiScore)}/100</span>
        </div>
      </div>

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4 mr-20">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{displayName}</h3>
            <p className="text-xs text-gray-500 font-mono">
              {vault.address.slice(0, 6)}...{vault.address.slice(-4)}
            </p>
          </div>
          <div className={`px-3 py-1 rounded-lg text-xs font-semibold border ${riskColors[riskLevel]}`}>
            {riskLevel.toUpperCase()}
          </div>
        </div>

        {/* Description */}
        {vault.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{vault.description}</p>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <div className="flex items-center text-xs text-gray-500 mb-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              APR
            </div>
            <div className={`text-2xl font-bold ${vault.apr >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatAPR(vault.apr)}
            </div>
            {vault.pastMonthReturn !== 0 && (
              <div className="text-xs text-gray-500 mt-1">
                30D: {vault.pastMonthReturn > 0 ? '+' : ''}{vault.pastMonthReturn.toFixed(2)}%
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center text-xs text-gray-500 mb-1">
              <DollarSign className="w-3 h-3 mr-1" />
              TVL
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {formatCurrency(vault.tvl)}
            </div>
          </div>
        </div>

        {/* Depositors & Min Investment */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm">
            <Users className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-gray-600">{vault.numDepositors}</span>
            <span className="text-gray-400 ml-1">depositors</span>
          </div>
          <div className="text-sm text-right">
            <span className="text-gray-600">Min: </span>
            <span className="font-semibold text-gray-900">
              {formatCurrency(vault.minDeposit || 100)}
            </span>
          </div>
        </div>

        {/* Leader Info */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <div className="text-xs text-gray-500 mb-1">Vault Leader</div>
          <div className="text-sm font-mono text-gray-900">
            {vault.leader.slice(0, 6)}...{vault.leader.slice(-4)}
          </div>
        </div>

        {/* CTA Button - Changes based on holder status */}
        {isHolder ? (
          <Link
            href={`/vaults/${vault.address}`}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center group-hover:scale-105"
          >
            Withdraw
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        ) : (
          <Link
            href={`/vaults/${vault.address}`}
            className="w-full btn-primary flex items-center justify-center group-hover:scale-105 transition-transform"
          >
            Deposit
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
