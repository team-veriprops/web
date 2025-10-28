import { Shield } from "lucide-react";

export default function TrustNetworkFooter(){
    return (
        <footer className="border-t py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>© 2025 Veriprops. All rights reserved.</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary">
                Partner Agreement
              </a>
              <a href="#" className="hover:text-primary">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary">
                Escrow Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    )
}