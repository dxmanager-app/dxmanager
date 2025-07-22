export default function Home() {
  return (
    <div className="flex h-full items-center justify-center bg-background p-6">
      <div className="rounded-2xl bg-card shadow-xl p-10 max-w-xl text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">Witamy w DxManager</h1>
        <p className="text-muted-foreground text-lg">
          Wybierz test z menu po lewej stronie, aby rozpocząć pracę z aplikacją.
        </p>
      </div>
    </div>
  )
}
