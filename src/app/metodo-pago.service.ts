import { Injectable } from '@angular/core';
import {Web3} from "web3";

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {
tarjeta = true;
paypal = false;
pagarCrypto = false;
cryptoSelect = "";
metodoPago = "";
hashTransaccion = "";

private web3: Web3;

pagoTarjeta(){
  this.tarjeta = true;
  this.paypal = false;
  this.pagarCrypto = false;
  this.metodoPago = "Tarjeta";
}

pagoPayPal(){
  this.tarjeta = false;
  this.paypal = true;
  this.pagarCrypto = false;
  this.metodoPago = "PayPal";
}

pagoCrypto(cryptoSelected: string){
  this.tarjeta = false;
  this.paypal = false;
  this.pagarCrypto = true;
  this.metodoPago = "Crypto";
  this.cryptoSelect = cryptoSelected;
}

  constructor() {
    this.web3 = new Web3((window as any).ethereum);
  }

  async comprar(precio: number, moneda: string): Promise<void> {
    this.pagoCrypto(moneda);
    if (this.isMetamaskInstalled()) {
      try {
        const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        const userAccount = accounts[0];
        const walletDestino = '0xf9A2872f9d76Bb62BFDcf40448701a10B67f924A';

        if (moneda === 'BNB') {
          await this.sendBNBTransaction(userAccount, walletDestino, precio);
        } else if (moneda === 'BTC') {
          const tokenContractAddress = '0x6ce8da28e2f864420840cf74474eff5fd80e65b8'; // Dirección del contrato inteligente de BTC
          const tokenContractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"_burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];
          await this.sendERC20Transaction(userAccount, walletDestino, precio, tokenContractAddress, tokenContractABI);
        }
      } catch (error) {
        console.error('Error al conectar con Metamask:', error);
      }
    } else {
      window.alert("Debes instalar MetaMask para continuar");
    }
  }

  private isMetamaskInstalled(): boolean {
    return typeof (window as any).ethereum !== 'undefined';
  }

  private async sendBNBTransaction(from: string, to: string, amount: number): Promise<void> {
    try {
      const value = this.web3.utils.toWei(amount.toString(), 'ether');
      await this.web3.eth.sendTransaction({ from, to, value })
        .on('transactionHash', (hash: string) => {
          console.log('Transacción enviada con éxito. Hash:', hash);
          this.hashTransaccion = hash;
        })
        .on('error', (error: Error) => {
          console.error('Error al enviar la transacción:', error);
          window.alert("Error en la transacción");
        });
    } catch (error) {
      console.error('Error al enviar BNB:', error);
      window.alert("Error en la transacción");
    }
  }

  private async sendERC20Transaction(from: string, to: string, amount: number, contractAddress: string, contractABI: any[]): Promise<void> {
    try {
      const tokenContract = new this.web3.eth.Contract(contractABI, contractAddress);
      const amountInWei = this.web3.utils.toWei(amount.toString(), 'ether');

      // @ts-ignore
      await tokenContract.methods.transfer(to, amountInWei).send({ from })
        .on('transactionHash', (hash: string) => {
          console.log('Transacción enviada con éxito. Hash:', hash);
          this.hashTransaccion = hash;
        })
        .on('error', (error: Error) => {
          console.error('Error al enviar la transacción:', error);
          window.alert("Error en la transacción");
        });
    } catch (error) {
      console.error('Error al enviar BTC (token ERC20):', error);
      window.alert("Error en la transacción");
    }
  }
}
