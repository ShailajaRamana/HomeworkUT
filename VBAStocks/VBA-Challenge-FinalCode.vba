Sub sample()

    Dim y As Double
    Dim z As Double
    Dim sum, NumRows As Double
    Dim great_inc, great_dec, great_vol As Double
     
   For Each ws In Worksheets       'Looping through the worksheets
    
   Row = 2      'initial row start
   z = 2        'intial row for results
   x = ws.Range("A2").Value     'ticker values
   NumRows = ws.Cells(Rows.Count, 1).End(xlUp).Row      'total number of rows in sheet

    'result headers
    ws.Cells(1, 9).Value = "Ticker"
    ws.Cells(1, 10).Value = "Yearly change"
    ws.Cells(1, 11).Value = "Percent change"
    ws.Cells(1, 12).Value = "Total stock volume"


    While Row < NumRows     'while loop till the end of sheet
        first = ws.Cells(Row, 3)    'opening value of stock
        sum = ws.Cells(Row, 7)      'initial volume of stock
        While x = ws.Cells(Row, 1)      'while loop for a stock
            Row = Row + 1
            sum = sum + ws.Cells(Row, 7)
        Wend
        x = ws.Cells(Row, 1)
        last = ws.Cells(Row - 1, 6)     'closing value of stock
        ws.Cells(z, 9).Value = ws.Cells(Row - 1, 1)     'write result ticker
        ws.Cells(z, 10).Value = last - first        'write result difference for a stock
        'conditional coloring
        If ws.Cells(z, 10) >= 0 Then
        ws.Cells(z, 10).Interior.Color = RGB(0, 255, 0)
        Else
        ws.Cells(z, 10).Interior.Color = RGB(255, 0, 0)
        End If
        'check is percentage value is valid and not a divison by 0
        If first = 0 And (last - first) = 0 Then
        ws.Cells(z, 11).Value = 0
        Else
        ws.Cells(z, 11).Value = (last - first) / first * 100
        End If
        ws.Cells(z, 12).Value = sum     'write result total vol of stock

        'intializing greatest values
        If z = 2 Then
        great_inc = ws.Cells(z, 11)
        great_dec = ws.Cells(z, 11)
        great_vol = ws.Cells(z, 12)
        ticker_inc = ws.Cells(z, 9)
        ticker_dec = ws.Cells(z, 9)
        ticker_vol = ws.Cells(z, 9)
        End If
        
        If great_inc < ws.Cells(z, 11).Value Then
        great_inc = ws.Cells(z, 11)
        ticker_inc = ws.Cells(z, 9)
        ElseIf great_dec > ws.Cells(z, 11).Value Then
        great_dec = ws.Cells(z, 11)
        ticker_dec = ws.Cells(z, 9)
        ElseIf great_vol < ws.Cells(z, 12).Value Then
        great_vol = ws.Cells(z, 12)
        ticker_vol = ws.Cells(z, 9)
        End If

        z = z + 1       'result next row

        ws.Cells(2, 15).Value = "Greatest % increase"
        ws.Cells(3, 15).Value = "Greatest % decrease"
        ws.Cells(4, 15).Value = "Greatest Total Volume"
        ws.Cells(1, 16).Value = "Ticker"
        ws.Cells(1, 17).Value = "Value"
        
        ws.Cells(2, 16).Value = ticker_inc
        ws.Cells(3, 16).Value = ticker_dec
        ws.Cells(4, 16).Value = ticker_vol
        ws.Cells(2, 17).Value = great_inc
        ws.Cells(3, 17).Value = great_dec
        ws.Cells(4, 17).Value = great_vol

    Wend
    
    Next ws

    MsgBox ("Done")
    
End Sub


