import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { TablesService } from './tables.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Tables } from './schemas/table.schema';
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@Roles("SUPERADMIN")
@ApiTags('tables')
@Controller('tables')
export class TablesController {
    constructor(private readonly tablesService: TablesService) { }

    @Roles("SUPERADMIN", "MANAGER")
    @UseGuards(RolesGuard)
    @Post()
    @ApiOperation({ summary: 'Create a new table' })
    @ApiResponse({ status: 201, description: 'The table has been successfully created.', type: Tables })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    create(@Body() createTableDto: CreateTableDto) {
        return this.tablesService.create(createTableDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all tables' })
    @ApiResponse({ status: 200, description: 'Return all tables', type: [Tables] })
    findAll() {
        return this.tablesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get table by ID' })
    @ApiResponse({ status: 200, description: 'Return table by ID', type: Tables })
    @ApiResponse({ status: 404, description: 'Table not found.' })
    findOne(@Param('id', ParseIntPipe) id: string) {
        return this.tablesService.findOne(+id);
    }

    @Roles("SUPERADMIN", "MANAGER")
    @UseGuards(RolesGuard)
    @Patch(':id')
    @ApiOperation({ summary: 'Update table by ID' })
    @ApiResponse({ status: 200, description: 'The table has been successfully updated.', type: Tables })
    @ApiResponse({ status: 404, description: 'Table not found.' })
    update(@Param('id', ParseIntPipe) id: number, @Body() updateTableDto: UpdateTableDto) {
        return this.tablesService.update(id, updateTableDto);
    }

    @Roles("SUPERADMIN")
    @UseGuards(RolesGuard)
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete a table by ID' })
    @ApiResponse({ status: 200, description: 'The table has been successfully deleted.', schema: { example: { message: "table with {id}-ID deleted successfully." } } })
    async remove(@Param('id', ParseIntPipe) id: string): Promise<{ message: string }> {
        const message = await this.tablesService.remove(+id);
        return { message };
    }
}
