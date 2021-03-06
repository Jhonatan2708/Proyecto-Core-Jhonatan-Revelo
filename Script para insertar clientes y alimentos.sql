SET IDENTITY_INSERT [dbo].[Customers] ON 
GO
INSERT [dbo].[Customers] ([CustomerId], [CustomerName]) VALUES (1, N'Henry Acosta')
GO
INSERT [dbo].[Customers] ([CustomerId], [CustomerName]) VALUES (2, N'Daniel Herrera')
GO
INSERT [dbo].[Customers] ([CustomerId], [CustomerName]) VALUES (3, N'Andrea Iza')
GO
INSERT [dbo].[Customers] ([CustomerId], [CustomerName]) VALUES (4, N'Jhonatan Revelo')
GO
INSERT [dbo].[Customers] ([CustomerId], [CustomerName]) VALUES (5, N'Carlos Espinosa')
GO
INSERT [dbo].[Customers] ([CustomerId], [CustomerName]) VALUES (6, N'Sandra Belen')
GO
SET IDENTITY_INSERT [dbo].[Customers] OFF
GO
SET IDENTITY_INSERT [dbo].[FoodItems] ON 
GO
INSERT [dbo].[FoodItems] ([FoodItemId], [FoodItemName], [Price]) VALUES (1, N'Sopa', CAST(2.50 AS Decimal(18, 2)))
GO
INSERT [dbo].[FoodItems] ([FoodItemId], [FoodItemName], [Price]) VALUES (2, N'Estofado de Costilla', CAST(2.49 AS Decimal(18, 2)))
GO
INSERT [dbo].[FoodItems] ([FoodItemId], [FoodItemName], [Price]) VALUES (3, N'Pollo Broaster', CAST(1.20 AS Decimal(18, 2)))
GO
INSERT [dbo].[FoodItems] ([FoodItemId], [FoodItemName], [Price]) VALUES (4, N'Pescado en salsa golf', CAST(2.00 AS Decimal(18, 2)))
GO
INSERT [dbo].[FoodItems] ([FoodItemId], [FoodItemName], [Price]) VALUES (5, N'Filete de Pollo al Vapor', CAST(1.99 AS Decimal(18, 2)))
GO
INSERT [dbo].[FoodItems] ([FoodItemId], [FoodItemName], [Price]) VALUES (6, N'Arroz', CAST(1.00 AS Decimal(18, 2)))
GO
INSERT [dbo].[FoodItems] ([FoodItemId], [FoodItemName], [Price]) VALUES (7, N'Papas al Cilantro', CAST(0.90 AS Decimal(18, 2)))
GO
INSERT [dbo].[FoodItems] ([FoodItemId], [FoodItemName], [Price]) VALUES (8, N'Pasta Salteada', CAST(0.90 AS Decimal(18, 2)))
GO
INSERT [dbo].[FoodItems] ([FoodItemId], [FoodItemName], [Price]) VALUES (9, N'Ensalada (lechuga y tomate)', CAST(0.75 AS Decimal(18, 2)))
GO
INSERT [dbo].[FoodItems] ([FoodItemId], [FoodItemName], [Price]) VALUES (10, N'Mix de Frutas', CAST(0.50 AS Decimal(18, 2)))
GO
INSERT [dbo].[FoodItems] ([FoodItemId], [FoodItemName], [Price]) VALUES (11, N'Ensalada (Vainita y zanahoria salteada)', CAST(0.75 AS Decimal(18, 2)))
GO
INSERT [dbo].[FoodItems] ([FoodItemId], [FoodItemName], [Price]) VALUES (12, N'Ensalada (Col Morada y Zahanaroia)', CAST(0.75 AS Decimal(18, 2)))
GO
INSERT [dbo].[FoodItems] ([FoodItemId], [FoodItemName], [Price]) VALUES (13, N'Ensalada (Lechuga, ubilla y miel mostaza)', CAST(0.75 AS Decimal(18, 2)))
GO
INSERT [dbo].[FoodItems] ([FoodItemId], [FoodItemName], [Price]) VALUES (14, N'Tea', CAST(0.75 AS Decimal(18, 2)))
GO
INSERT [dbo].[FoodItems] ([FoodItemId], [FoodItemName], [Price]) VALUES (15, N'Botella de Agua', CAST(0.75 AS Decimal(18, 2)))
GO
INSERT [dbo].[FoodItems] ([FoodItemId], [FoodItemName], [Price]) VALUES (16, N'Jugos', CAST(0.50 AS Decimal(18, 2)))
GO
INSERT [dbo].[FoodItems] ([FoodItemId], [FoodItemName], [Price]) VALUES (17, N'Infusión de Agua Aromática', CAST(0.75 AS Decimal(18, 2)))
GO
SET IDENTITY_INSERT [dbo].[FoodItems] OFF
GO
