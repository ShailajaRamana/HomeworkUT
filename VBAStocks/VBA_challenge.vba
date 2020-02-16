Sub sample()

totalsheets = Worksheets.Count


    Dim y As Integer
    Dim z As Integer
    Dim sum As Double
    
    'For Each ws In Worksheets
    
   Row = 2
    'x = ws.Range("A2").Value
     x = Range("A2").Value
    'NumRows = Cells(Rows.Count, 1).End(xlUp).Row
    NumRows = ws.Range("A2", Range("A2").End(xlDown)).Rows.Count
    'NumRows = Rows.Count
    
    z = 2
    
    Cells(1, 9).Value = "Ticker"
    Cells(1, 10).Value = "Yearly change"
    Cells(1, 11).Value = "Percent change"
    Cells(1, 12).Value = "Total stock volume"
    
    While Row < NumRows
        first = Cells(Row, 3)
        sum = Cells(Row, 7)
        While x = Cells(Row, 1)
            Row = Row + 1
            sum = sum + Cells(Row, 7)
        Wend
        x = Cells(Row, 1)
        last = Cells(Row - 1, 6)
        Cells(z, 9).Value = Cells(Row - 1, 1)
        Cells(z, 10).Value = last - first
        If Cells(z, 10) >= 0 Then
        Cells(z, 10).Interior.Color = RGB(0, 255, 0)
        Else
        Cells(z, 10).Interior.Color = RGB(255, 0, 0)
        End If
        
        
        Cells(z, 11).Value = (last - first) / first * 100
        Cells(z, 12).Value = sum
        z = z + 1
    Wend
    
    'Next ws
    
End Sub
